# Content maintenance tools

This directory is retained for local maintenance and excluded from the published
Jekyll site. The Markdown files in `_publications/` and `_talks/` are the source of
truth for the current website. Edit those directly for routine updates.

`publications.tsv` and `talks.tsv` intentionally contain headers only: the old
Academic Pages demonstration rows have been removed. The legacy `.py` and
`.ipynb` importers remain available for bulk imports, but they produce the older
template metadata and can overwrite files with matching dates/slugs. Run an
import in a temporary checkout, review the diff, and add the current structured
fields before moving new entries into the maintained collections. These legacy
tools require their documented optional Python/Jupyter packages; they are not
part of the site build or CI.

## Publications

Use an existing `_publications/*.md` file as the current schema. Preserve stable
permalinks, or retain the old address in `redirect_from` when changing a slug.
Provide the actual authors, publication status, a short description, and verified
DOI/arXiv/BibTeX links. Add code and data links only when public resources exist.

## Talks and map

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
it matches the published talks without writing anything. Both use only Python's
standard library. The original `talkmap.ipynb` and output notebook are preserved
as historical maintenance material and are no longer used by CI.

## Validation

```sh
JEKYLL_ENV=production bundle exec jekyll build
python3 scripts/validate_site.py _site
```

The validator checks rendered internal links and fragments, scholarly metadata,
and that local tooling and unpublished photography entries do not appear in a
production build. Use the main repository README for the photography draft and
preview workflow.



