/*
 * Autoplaying teaser videos are decorative motion, so honour the visitor's
 * "reduce motion" setting: pause them and hold on the poster frame instead.
 * Reacts live, so toggling the OS setting takes effect without a reload.
 */
(function () {
  'use strict';

  if (typeof window.matchMedia !== 'function') {
    return;
  }

  var query = window.matchMedia('(prefers-reduced-motion: reduce)');

  function apply() {
    var videos = document.querySelectorAll('video.teaser');

    Array.prototype.forEach.call(videos, function (video) {
      if (query.matches) {
        video.removeAttribute('autoplay');
        video.pause();
        // load() resets readyState to HAVE_NOTHING, which is what brings the
        // poster back. Seeking to 0 would just hold on the first frame, and
        // the first frame of a build-up animation is usually near-empty.
        video.load();
      } else if (video.paused) {
        video.setAttribute('autoplay', '');
        var playing = video.play();
        // Browsers that block autoplay reject here; the poster stays visible.
        if (playing && typeof playing.catch === 'function') {
          playing.catch(function () {});
        }
      }
    });
  }

  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', apply);
  } else if (typeof query.addListener === 'function') {
    query.addListener(apply); // Safari < 14
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
