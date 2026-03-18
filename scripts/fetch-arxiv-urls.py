"""
arXiv API를 이용해 best-papers.json의 각 논문에 arXiv URL을 추가하는 스크립트.
- paper_url이 없는 항목만 처리
- 진행 상황을 10개마다 저장 (중단 후 재시작 가능)
- arXiv API: 3 req/sec 허용 → 0.4초 딜레이
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET

INPUT_FILE = "src/infrastructure/seed/best-papers.json"
DELAY = 1.5
RETRY_DELAY = 60
MAX_RETRIES = 3

def search_arxiv(title: str):
    # arXiv title search
    query = urllib.parse.quote(f'ti:"{title}"')
    url = f"https://export.arxiv.org/api/query?search_query={query}&max_results=1&sortBy=relevance"

    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "cs-pedia-bot/1.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read()

            root = ET.fromstring(content)
            ns = {"atom": "http://www.w3.org/2005/Atom"}
            entries = root.findall("atom:entry", ns)
            if not entries:
                return None

            # 제목 유사도 체크 (arXiv 제목이 검색 제목과 너무 다르면 skip)
            arxiv_title = entries[0].find("atom:title", ns)
            if arxiv_title is not None:
                atitle = arxiv_title.text.strip().lower().replace("\n", " ")
                qtitle = title.lower()
                # 첫 단어 5개 이상 겹치는지 확인
                aw = set(atitle.split()[:10])
                qw = set(qtitle.split()[:10])
                if len(aw & qw) < 4:
                    return None

            # arXiv ID 추출
            entry_id = entries[0].find("atom:id", ns)
            if entry_id is not None:
                arxiv_url = entry_id.text.strip()
                # abs URL 형태로 변환
                if "arxiv.org/abs/" in arxiv_url:
                    return arxiv_url
            return None

        except urllib.error.HTTPError as e:
            if e.code == 503 or e.code == 429:
                print(f"\n  ⚠ {e.code} 에러, {RETRY_DELAY}초 대기 ({attempt+1}/{MAX_RETRIES})...", flush=True)
                time.sleep(RETRY_DELAY)
            else:
                print(f"  HTTP {e.code}")
                return None
        except Exception as e:
            print(f"  오류: {e}")
            return None
    return None

def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        papers = json.load(f)

    total = len(papers)
    missing = [(i, p) for i, p in enumerate(papers) if not p.get("paper_url")]
    print(f"전체: {total}개, 처리 대상: {len(missing)}개")
    print(f"예상 시간: 약 {len(missing) * DELAY / 60:.1f}분\n")

    found = 0
    for count, (i, paper) in enumerate(missing, 1):
        title = paper["paper_title"]
        slug = paper["conference_slug"]
        year = paper["year"]

        print(f"[{count}/{len(missing)}] {slug} {year}: {title[:55]}...", end=" ", flush=True)

        url = search_arxiv(title)
        if url:
            papers[i]["paper_url"] = url
            print(f"✓")
            found += 1
        else:
            print("✗")

        if count % 10 == 0:
            with open(INPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(papers, f, ensure_ascii=False, indent=2)
            print(f"  → 저장 ({found}/{count} 발견)\n")

        time.sleep(DELAY)

    with open(INPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(papers, f, ensure_ascii=False, indent=2)

    print(f"\n완료! {found}/{len(missing)}개 arXiv URL 발견")

if __name__ == "__main__":
    main()
