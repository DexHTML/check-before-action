#!/usr/bin/env python3
"""Dependency-free structural audit for the static site."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SITE_PREFIX = "https://dexhtml.github.io/check-before-action/"
EXCLUDED_HTML = {"404.html", "google387d1835df61fa49.html"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title_count = 0
        self.h1_count = 0
        self.has_description = False
        self.canonicals: list[str] = []
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "title":
            self.title_count += 1
        if tag.lower() == "h1":
            self.h1_count += 1
        if tag.lower() == "meta" and values.get("name", "").lower() == "description":
            self.has_description = bool(values.get("content", "").strip())
        if tag.lower() == "link" and values.get("rel", "").lower() == "canonical":
            self.canonicals.append(values.get("href", ""))
        for attribute in ("href", "src"):
            if values.get(attribute):
                self.references.append(values[attribute])


def expected_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    return SITE_PREFIX if relative == "index.html" else SITE_PREFIX + relative


def local_target(page: Path, reference: str) -> Path | None:
    clean = urlsplit(reference).path
    if not clean or reference.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
        return None
    if clean.startswith("/check-before-action/"):
        return ROOT / clean.removeprefix("/check-before-action/")
    if clean.startswith("/"):
        return None
    return (page.parent / clean).resolve()


def main() -> int:
    errors: list[str] = []
    public_pages: list[Path] = []

    for page in sorted(ROOT.rglob("*.html")):
        relative = page.relative_to(ROOT).as_posix()
        if relative in EXCLUDED_HTML:
            continue

        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        public_pages.append(page)

        if parser.title_count != 1:
            errors.append(f"{relative}: expected one title, found {parser.title_count}")
        if parser.h1_count != 1:
            errors.append(f"{relative}: expected one h1, found {parser.h1_count}")
        if not parser.has_description:
            errors.append(f"{relative}: missing meta description")
        if parser.canonicals != [expected_url(page)]:
            errors.append(f"{relative}: canonical must be {expected_url(page)}")

        for reference in parser.references:
            target = local_target(page, reference)
            if target is not None and not target.exists():
                errors.append(f"{relative}: broken local reference {reference}")

    sitemap = ElementTree.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = {
        node.text.strip()
        for node in sitemap.findall("sm:url/sm:loc", namespace)
        if node.text
    }
    expected_urls = {expected_url(page) for page in public_pages}
    if sitemap_urls != expected_urls:
        for url in sorted(expected_urls - sitemap_urls):
            errors.append(f"sitemap: missing {url}")
        for url in sorted(sitemap_urls - expected_urls):
            errors.append(f"sitemap: unexpected {url}")

    main_js = (ROOT / "assets/js/main.js").read_text(encoding="utf-8")
    metrika_goals = {
        "call_checker_finished",
        "money_checker_finished",
        "family_code_generated",
        "article_share_copy_url",
        "family_memo_copy",
    }
    event_files = list(ROOT.glob("assets/js/*.js")) + public_pages
    source_text = "\n".join(path.read_text(encoding="utf-8") for path in event_files)
    for goal in sorted(metrika_goals):
        if goal not in source_text:
            errors.append(f"analytics: configured goal is absent from JavaScript: {goal}")
    if not re.search(r"window\.METRIKA_ID\s*=\s*110429323", main_js):
        errors.append("analytics: unexpected or missing Metrika counter ID")

    if errors:
        print("Site audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Site audit passed: {len(public_pages)} public HTML pages, {len(sitemap_urls)} sitemap URLs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
