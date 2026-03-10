#!/usr/bin/env python3
"""
Semantic Scholar API로 paper_url 없는 best paper 링크 수집 (2차 스크립트)
arXiv 스크립트 완료 후 실행: python3 scripts/fetch-semantic-urls.py
"""
import json
import time
import urllib.request
import urllib.parse

INPUT_FILE = "src/infrastructure/seed/best-papers.json"
DELAY = 600.0  # seconds between requests (10 min, no API key)

def search_semantic_scholar(title: str):
    """Semantic Scholar API로 논문 검색, 가장 관련성 높은 URL 반환."""
    query = urllib.parse.quote(title)
    url = (
        f"https://api.semanticscholar.org/graph/v1/paper/search"
        f"?query={query}&limit=3&fields=title,externalIds,openAccessPdf,url"
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CS-Pedia/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())

        papers = data.get("data", [])
        if not papers:
            return None

        # 제목 유사도 체크
        query_words = set(title.lower().split())
        for paper in papers:
            s2_title = paper.get("title", "")
            s2_words = set(s2_title.lower().split())
            overlap = len(query_words & s2_words)
            if overlap < max(3, len(query_words) // 2):
                continue

            ext = paper.get("externalIds", {})

            # 우선순위: arXiv > openAccessPdf > S2 URL
            if ext.get("ArXiv"):
                return f"https://arxiv.org/abs/{ext['ArXiv']}"

            if paper.get("openAccessPdf"):
                return paper["openAccessPdf"].get("url")

            if ext.get("DOI"):
                return f"https://doi.org/{ext['DOI']}"

        return None

    except Exception as e:
        if "429" in str(e):
            print(f"\n  ⚠ Rate limit, 90초 대기...", flush=True)
            time.sleep(90)
            # 한 번만 재시도
            try:
                with urllib.request.urlopen(req, timeout=10) as resp:
                    data = json.loads(resp.read())
                papers = data.get("data", [])
                query_words = set(title.lower().split())
                for paper in papers:
                    s2_words = set(paper.get("title", "").lower().split())
                    if len(query_words & s2_words) < max(3, len(query_words) // 2):
                        continue
                    ext = paper.get("externalIds", {})
                    if ext.get("ArXiv"):
                        return f"https://arxiv.org/abs/{ext['ArXiv']}"
                    if paper.get("openAccessPdf"):
                        return paper["openAccessPdf"].get("url")
                    if ext.get("DOI"):
                        return f"https://doi.org/{ext['DOI']}"
            except Exception:
                pass
        return None


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        papers = json.load(f)

    missing = [(i, p) for i, p in enumerate(papers) if not p.get("paper_url")]
    print(f"paper_url 없는 논문: {len(missing)}개 (전체 {len(papers)}개)")
    print(f"예상 소요 시간: ~{len(missing) * DELAY / 60:.0f}분\n")

    found = 0
    for count, (i, paper) in enumerate(missing, 1):
        title = paper.get("title", "")
        print(f"[{count}/{len(missing)}] {title[:60]}... ", end="", flush=True)

        url = search_semantic_scholar(title)
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

    print(f"\n완료! {found}/{len(missing)}개 URL 발견")
    print(f"pnpm seed 실행해서 DB 반영하세요.")


if __name__ == "__main__":
    main()
