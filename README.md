# ruoyuguan.github.io

Source code of Ruo-Yu Guan's personal academic website: <https://ruoyuguan.github.io>

Built with [Jekyll](https://jekyllrb.com/) using the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template, hosted on GitHub Pages.

**Maintenance entry:** [网站维护指南 / MAINTENANCE.md](MAINTENANCE.md) — includes photography drafts, source editing links, local preview, publication metadata, image generation and CV export.

## Content structure

| Directory | Content |
|---|---|
| `_pages/about.md` | Homepage: research, selected work, latest news |
| `_pages/research.md` | Research overview |
| `_pages/cv.md` | CV |
| `_publications/` | Journal articles (`category: manuscripts`) and preprints (`category: preprints`) |
| `_talks/` | Talks and posters |
| `_posts/` | Blog posts |
| `_portfolio/` | Photography archive (temporarily offline; local preview retained) |
| `files/` | Downloadable files (PDFs, BibTeX) — served at `/files/` |
| `images/` | Images |
| `_data/navigation.yml` | Header navigation links |
| `_config.yml` | Site-wide settings (author, analytics, SEO) |

## Updating content

- **New publication**: add a Markdown file to `_publications/` following the existing entries' front matter (`category: manuscripts` for journal articles, `category: preprints` for arXiv preprints). Put the BibTeX file in `files/` and reference it with `bibtexurl`.
- **New talk**: add a Markdown file to `_talks/` (filename must start with the talk date, `YYYY-MM-DD-...`). Slides/posters go to `files/`, preview images to `images/`.
- **New blog post**: add a Markdown file to `_posts/` (filename `YYYY-MM-DD-....md`).
- **Photography**: the public section is temporarily offline. Its pages, originals and WebP assets are excluded from production; source files and local preview remain available. An entry's `published: true` does not override the collection-wide exclusion. See the [maintenance, preview and restoration guide](MAINTENANCE.md#photography). Files in this public repository remain publicly accessible.

## Deployment

Push to `master`; GitHub Pages rebuilds the site automatically (usually within 1–2 minutes).

## Analytics & search

- Google Analytics 4 is configured but only loads after a visitor opts in on the Privacy page.
- Google Search Console verification file: `google0e0d4fbd93fdf402.html` in the repo root — **do not delete** (needed to keep the Search Console verification valid).

## Notes

- Do not commit `files/IMG_0042.JPG` (full-resolution original photo; excluded via `.gitignore`).
- Math in posts/publications: use `$...$` / `$$...$$` delimiters (MathJax 3). Publications enable math by default; other pages need `math: true`. Avoid `\(...\)` which kramdown mangles.
