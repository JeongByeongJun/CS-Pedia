"""
Semantic Scholar API를 이용해 best-papers.json의 각 논문에 arXiv URL을 추가하는 스크립트.
- paper_url이 없는 항목만 처리
- 진행 상황을 실시간으로 저장 (중단 후 재시작 가능)
- 429 rate limit 자동 재시도
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error

INPUT_FILE = "src/infrastructure/seed/best-papers.json"
DELAY = 3.0       # 기본 딜레이 (초)
RETRY_DELAY = 30  # 429 발생 시 대기 (초)
MAX_RETRIES = 3

def search_semantic_scholar(title: str):
    query = urllib.parse.quote(title)
    url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={query}&fields=externalIds,title&limit=1"

    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "cs-pedia-bot/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read())
            papers = data.get("data", [])
            if not papers:
                return None
            ext_ids = papers[0].get("externalIds", {})
            arxiv_id = ext_ids.get("ArXiv")
            if arxiv_id:
                return f"https://arxiv.org/abs/{arxiv_id}"
            return None
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"\n  ⚠ Rate limit (429), {RETRY_DELAY}초 대기 후 재시도 ({attempt+1}/{MAX_RETRIES})...", flush=True)
                time.sleep(RETRY_DELAY)
            else:
                print(f"  오류: HTTP {e.code}")
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
    print(f"전체: {total}개, paper_url 없는 항목: {len(missing)}개")
    print(f"예상 시간: 약 {len(missing) * DELAY / 60:.0f}분\n")

    found = 0
    for count, (i, paper) in enumerate(missing, 1):
        title = paper["paper_title"]
        print(f"[{count}/{len(missing)}] {paper['conference_slug']} {paper['year']}: {title[:55]}...", end=" ", flush=True)

        arxiv_url = search_semantic_scholar(title)
        if arxiv_url:
            papers[i]["paper_url"] = arxiv_url
            print(f"✓")
            found += 1
        else:
            print("✗")

        # 10개마다 저장
        if count % 10 == 0:
            with open(INPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(papers, f, ensure_ascii=False, indent=2)
            print(f"  → 저장 ({found}개 발견)")

        time.sleep(DELAY)

    # 최종 저장
    with open(INPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(papers, f, ensure_ascii=False, indent=2)

    print(f"\n완료! {found}/{len(missing)}개 arXiv URL 발견")

if __name__ == "__main__":
    main()
