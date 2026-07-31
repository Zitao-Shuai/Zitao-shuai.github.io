<h2 id="talks">Talks</h2>

<div class="publications">
<ol class="bibliography">
{%- for link in site.data.presentations.main %}
<li>
<article class="pub-row">
<div class="pub-teaser">
{%- if link.image %}
<img class="teaser" src="{{ link.image }}" loading="lazy" decoding="async" alt="Slide preview for {{ link.title | strip_html | escape }}">
{%- endif %}
{%- if link.conference_short %}
<abbr class="badge">{{ link.conference_short }}</abbr>
{%- endif %}
</div>
<div class="pub-meta">
<h3 class="title">{% if link.pdf %}<a href="{{ link.pdf }}" target="_blank" rel="noopener noreferrer">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</h3>
<p class="author">{{ link.authors }}</p>
{%- if link.conference %}
<p class="periodical"><em>{{ link.conference }}</em></p>
{%- endif %}
<p class="links">
{%- if link.pdf %}
<a class="btn" href="{{ link.pdf }}" target="_blank" rel="noopener noreferrer">Slides</a>
{%- endif %}
{%- if link.code %}
<a class="btn" href="{{ link.code }}" target="_blank" rel="noopener noreferrer">Code</a>
{%- endif %}
{%- if link.page %}
<a class="btn" href="{{ link.page }}" target="_blank" rel="noopener noreferrer">Project Page</a>
{%- endif %}
{%- if link.notes %}
<span class="tag">{{ link.notes }}</span>
{%- endif %}
</p>
</div>
</article>
</li>
{%- endfor %}
</ol>
</div>
