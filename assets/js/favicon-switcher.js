/*
 * Swaps the favicon when the OS colour scheme changes.
 *
 * Firefox and Safari ignore the `media` attribute on <link rel="icon">, so the
 * matching icon is promoted to a plain <link> instead. Driven by matchMedia
 * change events rather than a polling interval.
 */
(function () {
  'use strict';

  if (typeof window.matchMedia !== 'function') {
    return;
  }

  var sources = Array.prototype.slice.call(
    document.head.querySelectorAll('link[rel*="icon"][media]')
  );

  if (!sources.length) {
    return;
  }

  var active = document.createElement('link');
  active.setAttribute('rel', 'shortcut icon');
  document.head.appendChild(active);

  var queries = sources.map(function (link) {
    return window.matchMedia(link.media);
  });

  var applied;

  function apply() {
    var matched;

    queries.forEach(function (query, i) {
      if (query.matches) {
        matched = sources[i];
      }
    });

    if (!matched || matched === applied) {
      return;
    }

    applied = matched;
    active.setAttribute('type', matched.getAttribute('type') || 'image/png');
    active.setAttribute('href', matched.getAttribute('href'));
  }

  queries.forEach(function (query) {
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', apply);
    } else if (typeof query.addListener === 'function') {
      query.addListener(apply); // Safari < 14
    }
  });

  apply();

  // The originals would otherwise win in browsers that do honour `media`.
  sources.forEach(function (link) {
    document.head.removeChild(link);
  });
})();
