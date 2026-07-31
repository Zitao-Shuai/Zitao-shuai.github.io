# zitao-shuai.github.io

Source for my academic homepage, published with GitHub Pages at
<https://zitao-shuai.github.io/>.

Built on the [Minimal Light](https://github.com/yaoyao-liu/minimal-light) Jekyll
theme (loaded through `remote_theme`), with the layout, styles and includes in
this repository overriding the theme defaults.

## Editing content

Everything that appears on the page lives in four places:

| What | Where |
| --- | --- |
| Name, affiliation, email, profile links, SEO metadata | `_config.yml` |
| About / Research Interests / News / Outside the Office | `index.md` |
| Publication list | `_data/publications.yml` |
| Talks (not currently rendered) | `_data/presentations.yml` |

### Adding a publication

Add an entry at the top of `main:` in `_data/publications.yml`. The list is
rendered in file order, newest first.

```yaml
  - title: "Paper title"
    authors: "First Author, <b>Zitao Shuai</b>, Last Author"   # bold your own name
    conference_short: "<b>[ICML'26]</b>"                       # badge on the teaser
    conference: "Spotlight"                                    # optional sub-label
    pdf: "https://arxiv.org/abs/..."
    code: "https://github.com/..."                             # optional
    page: "https://..."                                        # optional
    image: "./assets/img/teaser.png"                           # .png/.jpg/.gif/.mp4
    poster: "./assets/img/teaser.jpg"                          # video only
    notes: "Foundation Models"                                 # optional tag
```

Mark equal contribution with a trailing `*` on the author names; the legend
above the list is rendered automatically.

`image` may be a still (`.png`, `.jpg`), an animated `.gif`, or a video
(`.mp4`, `.webm`) — videos render as a muted autoplaying loop, with `poster`
as the frame shown until playback starts. Teasers display at roughly 258×124
and are fit whole rather than cropped, so any aspect ratio is safe; wide ones
just fill the box better.

Keep teasers small — stills are lazy-loaded, but video is not, so it counts
against first paint. Project-page videos are often far larger than a thumbnail
needs (the Inertia-1 original was 4320×2100 at 62 fps, 56 MB). Re-encode before
committing:

```bash
ffmpeg -i original.mp4 -vf "scale=720:-2:flags=lanczos,fps=25" -an \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 30 -preset slow \
  -movflags +faststart teaser.mp4          # 56 MB -> ~300 KB, still sharp

ffmpeg -ss 25 -i teaser.mp4 -frames:v 1 -q:v 4 teaser.jpg   # poster frame
```

The same command converts an animated GIF (`-i teaser.gif`), which is worth
doing — H.264 is typically 20× smaller than the equivalent GIF, and a video can
carry a `poster`, so the entry shows a finished figure instead of the near-empty
first frame of a build-up animation.

Teaser videos autoplay muted and loop. `assets/js/teaser-motion.js` pauses them
and holds the poster for visitors who have "reduce motion" enabled.

To hide a paper without deleting it, comment the entry out — there is a
commented block at the bottom of the file for exactly this.

## Layout, styles and templates

| File | Purpose |
| --- | --- |
| `_layouts/homepage.html` | Page shell: `<head>`, sidebar, content slot |
| `_includes/publications.md` | Renders `_data/publications.yml` |
| `_includes/presentations.md` | Renders `_data/presentations.yml` |
| `_sass/_core.scss` | Design tokens and all shared styling |
| `_sass/minimal-light.scss` | Core + dark-mode token overrides |
| `_sass/minimal-light-no-dark-mode.scss` | Core only |
| `assets/css/publications.css` | Publication and talk list |
| `assets/css/font.css` / `font_sans_serif.css` | Body typeface |

Colours are defined once as CSS custom properties at the top of
`_sass/_core.scss`. Dark mode overrides those variables in
`_sass/minimal-light.scss`; it is not a second set of rules. Change a colour in
one place and both themes follow.

Set `auto_dark_mode: false` in `_config.yml` to disable dark mode, and
`font: "Sans Serif"` to switch typefaces.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Licence

Site content © Zitao Shuai. The underlying theme is distributed under
[CC0 1.0](LICENSE).
