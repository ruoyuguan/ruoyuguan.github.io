# ruoyuguan.github.io

Source code of Ruo-Yu Guan's personal academic website: <https://ruoyuguan.github.io>

Built with [Jekyll](https://jekyllrb.com/) using the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template, hosted on GitHub Pages.

## Content structure

| Directory | Content |
|---|---|
| `_pages/about.md` | Homepage (About Me) |
| `_pages/cv.md` | CV |
| `_publications/` | Journal articles (`category: manuscripts`) and preprints (`category: preprints`) |
| `_talks/` | Talks and posters |
| `_posts/` | Blog posts |
| `_portfolio/` | Gallery (photography) |
| `files/` | Downloadable files (PDFs, BibTeX) — served at `/files/` |
| `images/` | Images |
| `_data/navigation.yml` | Header navigation links |
| `_config.yml` | Site-wide settings (author, analytics, SEO) |

## Updating content

- **New publication**: add a Markdown file to `_publications/` following the existing entries' front matter (`category: manuscripts` for journal articles, `category: preprints` for arXiv preprints). Put the BibTeX file in `files/` and reference it with `bibtexurl`.
- **New talk**: add a Markdown file to `_talks/` (filename must start with the talk date, `YYYY-MM-DD-...`). Slides/posters go to `files/`, preview images to `images/`.
- **New blog post**: add a Markdown file to `_posts/` (filename `YYYY-MM-DD-....md`).
- **New gallery item**: add a Markdown file to `_portfolio/` with a title and an excerpt image; put the photo in `images/portfolio/`.

## Deployment

Push to `master`; GitHub Pages rebuilds the site automatically (usually within 1–2 minutes).

## Analytics & search

- Google Analytics 4 is enabled via `_config.yml` (`analytics` section).
- Google Search Console verification file: `google0e0d4fbd93fdf402.html` in the repo root — **do not delete** (needed to keep the Search Console verification valid).

## Notes

- Do not commit `files/IMG_0042.JPG` (full-resolution original photo; excluded via `.gitignore`).
- Math in posts/publications: use `$...$` / `$$...$$` delimiters (MathJax 3); avoid `\(...\)` which kramdown mangles.
