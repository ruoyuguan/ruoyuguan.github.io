# Archived importers and current content maintenance

This directory is retained for local maintenance and excluded from the published
Jekyll site. The Markdown files in `_publications/` and `_talks/` are the source of
truth for the current website. Edit those directly for routine updates.

`publications.tsv` and `talks.tsv` intentionally contain headers only: the old
Academic Pages demonstration rows have been removed. The legacy `.py` and
`.ipynb` importers are retired and cannot be run as maintenance commands. Their
original source is retained below explicit execution guards for historical
reference. Every notebook code cell stops independently, including when run out
of order; saved outputs are historical and have not been regenerated. No bypass
option is provided.

The retired tools assume older metadata, can overwrite collection files, and
do not reliably handle the current CV, YAML quoting, or citation formats. The
ORCID notebook must not be used to produce a verified BibTeX bibliography. If
an importer is needed in the future, implement and review it separately against
the current content schema before adding it to the supported workflow. Installing
the old optional dependencies does not make these archives supported tools.

The JSON-CV converter and its wrapper in `scripts/` are also retired. Maintain
`_pages/cv.md` and export the PDF with `scripts/export_cv.mjs`, following
`MAINTENANCE.md`. The unused `cv-layout` is an archived template; the maintained
CV uses the `archive` layout.

## Publications

Use an existing `_publications/*.md` file as the current schema. Preserve stable
permalinks, or retain the old address in `redirect_from` when changing a slug.
Provide the actual authors, publication status, a short description, and verified
DOI/arXiv/BibTeX links. Add code and data links only when public resources exist.

## Presentations and map

Keep the title, date, type, venue, location, and presentation links in
`_talks/*.md`. For the map, add one-line `latitude`, `longitude`, and
`map_precision: city` fields using verified approximate city coordinates. Use
`map: false` when coordinates are not yet known. The map builder does not geocode
or contact an external service.

From the repository root:

```sh
python3 talkmap.py
python3 talkmap.py --check
```

The first command regenerates `talkmap/org-locations.js`; the second checks that
it matches the published presentations without writing anything. Both use only Python's
standard library. The original `talkmap.ipynb` and `talkmap_out.ipynb` are disabled
historical archives. They must not be used to install packages, geocode locations,
or generate the map.

## Validation

```sh
JEKYLL_ENV=production bundle exec jekyll build
python3 scripts/validate_site.py _site
```

The validator checks rendered internal links and fragments, scholarly metadata,
and that local tooling and unpublished photography entries do not appear in a
production build. Use the main repository README for the photography draft and
preview workflow.



