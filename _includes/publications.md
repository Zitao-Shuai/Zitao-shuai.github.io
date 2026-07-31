<h2 id="publications">Selected Publications</h2>

<p class="pub-legend"><span aria-hidden="true">*</span> denotes equal contribution.</p>

<div class="publications">
<ol class="bibliography">
{%- for link in site.data.publications.main %}
<li>
<article class="pub-row">
<div class="pub-teaser">
{%- if link.image %}
{%- assign ext = link.image | split: "." | last | downcase %}
{%- if ext == "mp4" or ext == "webm" %}
<video class="teaser" src="{{ link.image }}"{% if link.poster %} poster="{{ link.poster }}"{% endif %} preload="metadata" autoplay loop muted playsinline disablepictureinpicture aria-label="Teaser animation for {{ link.title | strip_html | escape }}"></video>
{%- else %}
<img class="teaser" src="{{ link.image }}" loading="lazy" decoding="async" alt="Teaser figure for {{ link.title | strip_html | escape }}">
{%- endif %}
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
<a class="btn" href="{{ link.pdf }}" target="_blank" rel="noopener noreferrer">PDF</a>
{%- endif %}
{%- if link.code %}
<a class="btn" href="{{ link.code }}" target="_blank" rel="noopener noreferrer">Code</a>
{%- endif %}
{%- if link.page %}
<a class="btn" href="{{ link.page }}" target="_blank" rel="noopener noreferrer">Project Page</a>
{%- endif %}
{%- if link.bibtex %}
<a class="btn" href="{{ link.bibtex }}" target="_blank" rel="noopener noreferrer">BibTeX</a>
{%- endif %}
{%- if link.notes %}
<span class="tag">{{ link.notes }}</span>
{%- endif %}
{%- if link.others %}
{{ link.others }}
{%- endif %}
</p>
</div>
</article>
</li>
{%- endfor %}
</ol>
</div>
