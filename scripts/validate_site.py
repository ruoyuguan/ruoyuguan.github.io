#!/usr/bin/env python3
"""Validate a production Jekyll build with Python's standard library.

Checks local href/src/srcset/iframe/redirect targets and HTML fragments, parses
JSON-LD, checks publication discovery metadata, and detects accidentally shipped
maintenance tools, photography drafts, original photo assets, and placeholders.
External URLs are intentionally not fetched. Run after a clean production build:
    python3 scripts/validate_site.py _site
"""

import argparse
from collections import defaultdict
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import quote, unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


PROJECT = Path(__file__).resolve().parents[1]
PLACEHOLDERS = re.compile(
    r"Portfolio item number \d|This is an item in your portfolio|"
    r"Short description of portfolio item|London School of Testing|"
    r"UC-Berkeley Institute for Testing Science|Leaflet debug page|"
    r"Jupyter notebook markdown generator", re.IGNORECASE
)


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.metadata = defaultdict(list)
        self.json_ld = []
        self.problems = []
        self.text = []
        self.script_type = None
        self.script_text = []
        self.in_style = False
        self.canonical = None
        self.redirect = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                self.problems.append(f"duplicate HTML id: {attrs['id']}")
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        for name in ("href", "src", "poster"):
            if attrs.get(name):
                self.references.append((attrs[name], self.getpos()[0]))
        # Local raster srcsets contain comma-separated URL/descriptor pairs.
        # Embedded data URLs are outside this site's asset convention.
        if attrs.get("srcset") and not attrs["srcset"].startswith("data:"):
            for candidate in attrs["srcset"].split(","):
                if candidate.strip():
                    self.references.append((candidate.strip().split()[0], self.getpos()[0]))
        if tag == "img" and "alt" not in attrs:
            self.problems.append(f"line {self.getpos()[0]}: image missing alt attribute")
        if tag == "iframe" and not attrs.get("title"):
            self.problems.append(f"line {self.getpos()[0]}: iframe missing title")
        if tag == "meta":
            key = attrs.get("name", attrs.get("property", "")).lower()
            if key:
                self.metadata[key].append(attrs.get("content", ""))
            if attrs.get("http-equiv", "").lower() == "refresh":
                match = re.search(r"url\s*=\s*(.+)", attrs.get("content", ""), re.I)
                if match:
                    self.redirect = True
                    self.references.append((match[1].strip(" '\""), self.getpos()[0]))
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonical = attrs.get("href")
        if tag == "script":
            self.script_type = attrs.get("type", "javascript")
            self.script_text = []
        if tag == "style":
            self.in_style = True

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == "script":
            if self.script_type == "application/ld+json":
                try:
                    self.json_ld.append(json.loads("".join(self.script_text)))
                except json.JSONDecodeError as error:
                    self.problems.append(f"invalid JSON-LD: {error}")
            self.script_type = None
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.script_type is not None:
            self.script_text.append(data)
        elif not self.in_style:
            self.text.append(data)


def scalar_frontmatter(path, key):
    """Extract only simple top-level contract fields; not a general YAML parser."""
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return None
    frontmatter = text.split("---", 2)[1]
    match = re.search(r"^" + re.escape(key) + r":\s*([^\n]+)", frontmatter, re.M)
    if not match:
        return None
    return match[1].strip().strip("'\"")


def schema_contains(value, kind):
    if isinstance(value, dict):
        types = value.get("@type", [])
        if types == kind or isinstance(types, list) and kind in types:
            return True
        return any(schema_contains(child, kind) for child in value.values())
    return isinstance(value, list) and any(schema_contains(child, kind) for child in value)


def route_file(root, path):
    relative = unquote(path).lstrip("/")
    destination = (root / relative).resolve()
    if not destination.is_relative_to(root):
        return None
    candidates = [destination]
    if destination.suffix.lower() not in (".html", ".htm"):
        candidates += [destination / "index.html", Path(str(destination) + ".html")]
    return next((candidate for candidate in candidates if candidate.is_file()), None)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site", type=Path, help="built production site directory")
    parser.add_argument("--source", type=Path, default=PROJECT)
    parser.add_argument("--site-url", default="https://ruoyuguan.github.io")
    args = parser.parse_args()
    root = args.site.resolve()
    source = args.source.resolve()
    if not (root / "index.html").is_file():
        parser.error(f"{root} is not a built site (missing index.html)")
    errors = []
    pages = {}
    for path in sorted(root.rglob("*.html")):
        page = Page()
        page.feed(path.read_text(encoding="utf-8"))
        page.close()
        pages[path] = page
        name = path.relative_to(root).as_posix()
        errors.extend(f"{name}: {problem}" for problem in page.problems)
        if PLACEHOLDERS.search(" ".join(page.text)):
            errors.append(f"{name}: public template placeholder text")

    host = urlsplit(args.site_url).netloc
    internal_hosts = {host, "localhost:4000", "127.0.0.1:4000", "0.0.0.0:4000"}
    references = 0
    for path, page in pages.items():
        name = path.relative_to(root).as_posix()
        public_path = "/" + name
        if public_path.endswith("index.html"):
            public_path = public_path[:-len("index.html")]
        for reference, line in page.references:
            url = urlsplit(urljoin(args.site_url, public_path))
            target_url = urlsplit(urljoin(url.geturl(), reference))
            if target_url.scheme not in ("http", "https") or target_url.netloc not in internal_hosts:
                continue
            references += 1
            target = route_file(root, target_url.path)
            if target is None:
                errors.append(f"{name}:{line}: missing local target {reference}")
            elif target_url.fragment and target in pages:
                fragment = unquote(target_url.fragment).split(":~:", 1)[0]
                if fragment and fragment not in pages[target].ids:
                    errors.append(f"{name}:{line}: missing fragment {reference}")

    # These are maintenance or source assets, not public web pages.
    photography_hidden = scalar_frontmatter(source / '_pages/portfolio.html', 'published') == 'false'
    forbidden = (
        "markdown_generator", "scripts", "talkmap.py", "talkmap.ipynb",
        "talkmap_out.ipynb", "talkmap/leaflet_dist", "images/portfolio",
        "photography-drafts", "MAINTENANCE.md", "AGENTS.md",
        "package.json", "package-lock.json", "Gemfile", "Gemfile.lock",
    )
    if photography_hidden:
        forbidden += ("portfolio", "images/photography")
    for relative in forbidden:
        if (root / relative).exists():
            errors.append(f"production build contains maintenance/draft asset: {relative}")

    draft_routes = []
    for path in sorted((source / "_portfolio").glob("*")):
        if path.suffix not in (".md", ".html"):
            continue
        if photography_hidden or scalar_frontmatter(path, "published") == "false":
            route = scalar_frontmatter(path, "permalink") or f"/portfolio/{path.stem}/"
            draft_routes.append(route)
            if route_file(root, route):
                errors.append(f"unpublished photography route was generated: {route}")

    publications = 0
    for path in sorted((source / "_publications").glob("*.md")):
        if scalar_frontmatter(path, "published") == "false":
            continue
        route = scalar_frontmatter(path, "permalink")
        if not route:
            errors.append(f"{path.name}: publication needs an explicit canonical permalink")
            continue
        output = route_file(root, route)
        if output not in pages:
            errors.append(f"missing published article page: {route}")
            continue
        publications += 1
        page = pages[output]
        for name in ("citation_title", "citation_author", "citation_publication_date", "description"):
            if not any(value.strip() for value in page.metadata[name]):
                errors.append(f"{route}: missing scholarly metadata {name}")
        if not schema_contains(page.json_ld, "ScholarlyArticle"):
            errors.append(f"{route}: missing ScholarlyArticle JSON-LD")
        expected_canonical = args.site_url.rstrip("/") + quote(route, safe="/:%")
        if page.canonical != expected_canonical:
            errors.append(f"{route}: unexpected canonical {page.canonical!r}; expected {expected_canonical}")

    sitemap = root / "sitemap.xml"
    if not sitemap.exists():
        errors.append("missing sitemap.xml")
    else:
        try:
            tree = ET.parse(sitemap)
            for element in tree.iter():
                if element.tag.rsplit("}", 1)[-1] != "loc" or not element.text:
                    continue
                route = urlsplit(element.text).path
                if route_file(root, route) is None:
                    errors.append(f"sitemap references a missing route: {route}")
                if route in draft_routes or route.startswith(("/markdown_generator/", "/photography-drafts/")):
                    errors.append(f"sitemap includes unpublished/maintenance route: {route}")
        except ET.ParseError as error:
            errors.append(f"invalid sitemap XML: {error}")

    if errors:
        for error in sorted(set(errors)):
            print(f"ERROR: {error}", file=sys.stderr)
        print(f"Failed with {len(set(errors))} issue(s).", file=sys.stderr)
        return 1
    print(f"Validated {len(pages)} HTML pages, {references} internal references, {publications} scholarly articles, and {len(draft_routes)} excluded photography entries.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
