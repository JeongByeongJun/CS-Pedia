#!/usr/bin/env python3
"""
Fetch best paper awards from jeffhuang.com/best_paper_awards/
and merge into best-papers.json (dedup by normalized title).
Attribution: Data sourced from jeffhuang.com/best_paper_awards/ by Jeff Huang (Brown University).
"""

import json
import re
import urllib.request
from pathlib import Path
from bs4 import BeautifulSoup

# Map Jeff Huang's conference codes (#anchor) to our slugs
CONF_MAP = {
    "aaai": "aaai", "acl": "acl", "asplos": "asplos", "assets": "assets",
    "chi": "chi", "cikm": "cikm", "cscw": "cscw", "cvpr": "cvpr",
    "dac": "dac", "eurosys": "eurosys", "focs": "focs",
    "fse": "fse", "esec": "fse", "fsejointesec": "fse",
    "hpca": "hpca", "icml": "icml", "icse": "icse", "iccv": "iccv",
    "ijcai": "ijcai", "isca": "isca", "kdd": "kdd", "micro": "micro",
    "mobicom": "mobicom", "mobisys": "mobisys", "naacl": "naacl",
    "neurips": "neurips", "nips": "neurips",
    "oakland": "sp", "ieeesecpriv": "sp",
    "osdi": "osdi", "pldi": "pldi", "popl": "popl",
    "sc": "sc", "sigcomm": "sigcomm", "siggraph": "siggraph",
    "sigir": "sigir", "sigmod": "sigmod", "sosp": "sosp", "stoc": "stoc",
    "uist": "uist", "usenixsec": "usenix-security",
    "usenixatc": "usenix-atc", "vldb": "vldb", "www": "www",
    "iclr": "iclr", "emnlp": "emnlp", "ccs": "ccs", "ndss": "ndss",
    "ppopp": "ppopp", "oopsla": "oopsla", "issta": "issta",
    "ase": "ase", "msr": "msr", "sensys": "sensys",
    "infocom": "infocom", "nsdi": "nsdi", "fast": "fast",
    "uai": "uai", "aistats": "aistats", "corl": "corl",
    "iros": "iros", "icra": "icra", "eccv": "eccv", "wacv": "wacv",
    "3dv": "3dv", "miccai": "miccai", "recsys": "recsys",
    "wsdm": "wsdm", "colt": "colt", "pods": "pods",
    "edbt": "edbt", "icalp": "icalp", "soda": "soda",
    "socg": "socg", "ccc": "ccc", "date": "date", "iccad": "iccad",
    "hri": "hri", "icsme": "icsme", "saner": "saner",
    "interact": "interact", "mobilehci": "mobilehci",
    "dis": "dis", "iui": "iui", "ubicomp": "ubicomp",
    "coling": "coling", "eacl": "eacl", "conll": "conll",
    "ecml": "ecml-pkdd", "ecmlpkdd": "ecml-pkdd", "pakdd": "pakdd",
    "icdm": "icdm", "sdm": "sdm", "bigdata": "bigdata",
    "dasfaa": "dasfaa", "icde": "icde", "cluster": "cluster",
    "hpdc": "hpdc", "ics": "ics", "pact": "pact", "cgo": "cgo",
    "dsn": "dsn", "issre": "issre", "raid": "raid", "pets": "pets",
    "csf": "csf", "asiacrypt": "asiacrypt", "crypto": "crypto",
    "eurocrypt": "eurocrypt", "acsac": "acsac", "esorics": "esorics",
    "bmvc": "bmvc", "accv": "accv", "icpr": "icpr", "icip": "icip",
    "fg": "fg", "egsr": "egsr", "sca": "sca", "i3d": "i3d",
    "acml": "acml", "aamas": "aamas", "icaps": "icaps", "case": "case",
    "lrec": "lrec", "aacl": "aacl", "mdm": "mdm", "icnp": "icnp",
    "conext": "conext", "imc": "imc", "mobihoc": "mobihoc",
    "socc": "socc", "middleware": "middleware", "icst": "icst",
    "fase": "fase", "models": "models", "gecco": "gecco",
    "er": "er", "esem": "esem", "isrr": "isrr", "itcs": "itcs",
    "isaac": "isaac", "esa": "esa", "mfcs": "mfcs",
    "acmmm": "acm-mm", "mm": "acm-mm", "s&p": "sp",
    "icse-seip": "icse", "icse-nier": "icse",
    "ppf": "ppopp", "cscw2": "cscw",
    "emnlp-findings": "emnlp",
    "pacmpl": "oopsla",
    "pacmhci": "cscw",
}

def normalize_title(title):
    return re.sub(r'[^a-z0-9 ]', '', title.lower()).strip()

def parse_authors(td):
    """Extract clean author list (names only, no institutions) from authors <td>."""
    # Expand hidden et al. divs
    for div in td.find_all('div', class_='d-none'):
        div['class'] = []  # make visible for text extraction

    # Get all text, stripping institution parts
    raw = td.get_text(separator='\n')
    authors = []
    for line in raw.split('\n'):
        line = line.strip()
        if not line or line in ('; et al.', 'et al.'):
            continue
        # "Name, Institution" → take name only
        name = line.split(',')[0].strip()
        # Skip "& Name" format - clean it
        name = name.lstrip('& ').strip()
        if name and len(name) > 1 and not name.startswith('University') and not name.startswith('Institute'):
            authors.append(name)

    return ', '.join(authors[:8])  # cap at 8 authors

def main():
    out_path = Path('src/infrastructure/seed/best-papers.json')
    existing = json.loads(out_path.read_text())

    existing_keys = set()
    for p in existing:
        key = (p['conference_slug'], p['year'], normalize_title(p['paper_title']))
        existing_keys.add(key)
    print(f"Existing entries: {len(existing)}")

    print("Fetching jeffhuang.com/best_paper_awards/ ...")
    req = urllib.request.Request(
        'https://jeffhuang.com/best_paper_awards/',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='replace')
    print(f"Page fetched ({len(html):,} chars)")

    soup = BeautifulSoup(html, 'html.parser')

    # Each year is a <table id="YYYY">
    tables = soup.find_all('table', id=re.compile(r'^\d{4}$'))
    print(f"Found {len(tables)} year tables")

    new_entries = []
    skipped = 0
    unmapped = set()

    MIN_YEAR = 2020

    for table in tables:
        year = int(table['id'])
        if year < MIN_YEAR:
            continue

        rows = table.find_all('tr')
        current_conf_slug = None

        for row in rows:
            # Conference header cell (has rowspan)
            th = row.find('th', class_='category-name')
            if th:
                conf_link = th.find('a')
                if conf_link and conf_link.get('href'):
                    conf_code = conf_link['href'].split('#')[-1].lower()
                    current_conf_slug = CONF_MAP.get(conf_code)
                    if not current_conf_slug:
                        unmapped.add(conf_code)

            if not current_conf_slug:
                continue

            # Paper title cell
            tds = row.find_all('td')
            if len(tds) < 2:
                continue

            title_td = tds[0]
            authors_td = tds[1]

            title_link = title_td.find('a')
            if not title_link:
                continue
            title = title_link.get_text(strip=True)
            if not title or len(title) < 5:
                continue

            authors = parse_authors(authors_td)

            # Award type detection
            row_text = row.get_text().lower()
            if 'honorable' in row_text or 'runner' in row_text:
                award_type = 'honorable_mention'
            elif 'test of time' in row_text or 'most influential' in row_text:
                award_type = 'test_of_time'
            else:
                award_type = 'best_paper'

            key = (current_conf_slug, year, normalize_title(title))
            if key not in existing_keys:
                new_entries.append({
                    'conference_slug': current_conf_slug,
                    'year': year,
                    'paper_title': title,
                    'authors': authors,
                    'award_type': award_type,
                    'tags': [],
                    'paper_url': None,
                })
                existing_keys.add(key)
            else:
                skipped += 1

    print(f"\nNew: {len(new_entries)}, Skipped (duplicate): {skipped}")
    if unmapped:
        print(f"Unmapped conf codes ({len(unmapped)}): {sorted(unmapped)[:20]}")

    if new_entries:
        updated = existing + new_entries
        out_path.write_text(json.dumps(updated, indent=2, ensure_ascii=False))
        print(f"Saved. Total: {len(updated)} entries")

        from collections import Counter
        counts = Counter(e['conference_slug'] for e in new_entries)
        print("\nNew entries by conference:")
        for conf, count in sorted(counts.items()):
            print(f"  {conf}: +{count}")

if __name__ == '__main__':
    main()
