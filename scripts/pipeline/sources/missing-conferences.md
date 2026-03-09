# DB에 없는 학회 목록

> 분석 기준: SNU, POSTECH, KAIST/KIISE14, BK21, KIISE24 총 5개 기관 자료
> 생성일: 2026-03-09

---

## 🔴 최우선 추가 대상 (5개 소스에서 언급)

| 학회 | SNU | POSTECH | KIISE14 | BK21 | KIISE24 | 분야 |
|------|-----|---------|---------|------|---------|------|
| LICS | ✅ | ✅ | ✅ | ✅ | ✅ | Logic / PL |
| VIS (IEEE VIS) | ✅ | ✅ | ✅ | ✅ | ✅ | Visualization |
| RTSS | ✅ | ✅ | ✅ | ✅ | ✅ | Real-time Systems |
| RTAS | ✅ | ✅ | ✅ | ✅ | ✅ | Real-time Systems |
| SIGMETRICS | ✅ | ✅ | ✅ | ✅ | ✅ | Performance |
| ICFP | ✅ | ✅ | ✅ | ✅ | ✅ | PL (Functional) |

---

## 🟠 우선 추가 대상 (4개 소스에서 언급)

| 학회 | SNU | POSTECH | KIISE14 | BK21 | KIISE24 | 분야 |
|------|-----|---------|---------|------|---------|------|
| CAV | ✅ | ✅ | ✅ | — | ✅ | Verification |
| VR (IEEE VR) | — | ✅ | ✅ | ✅ | ✅ | VR/AR |
| ISWC | ✅ | ✅ | ✅ | — | ✅ | Semantic Web |
| ECRTS | — | ✅ | ✅ | ✅ | ✅ | Real-time Systems |

---

## 🟡 추가 권장 (3개 소스에서 언급)

| 학회 | SNU | POSTECH | KIISE14 | BK21 | KIISE24 | 분야 |
|------|-----|---------|---------|------|---------|------|
| PODC | ✅ | — | ✅ | — | ✅ | Distributed Computing |
| ISMAR | — | ✅ | — | ✅ | ✅ | AR/MR |
| MM (ACM MM) | — | ✅ | — | ✅ | ✅ | Multimedia |
| ISMB | — | ✅ | — | ✅ | ✅ | Bioinformatics |
| RECOMB | — | ✅ | — | ✅ | ✅ | Bioinformatics |
| TACAS | — | ✅ | ✅ | — | ✅ | Verification |
| PerCom | — | ✅ | ✅ | ✅ | — | Pervasive Computing |
| CODES+ISSS | — | ✅ | ✅ | ✅ | — | Embedded Systems |
| ECOOP | — | ✅ | — | ✅ | ✅ | PL / OOP |
| BIBM | — | ✅ | — | ✅ | ✅ | Bioinformatics |

---

## 🟢 검토 대상 (2개 소스에서 언급)

| 학회 | 소스 | 분야 |
|------|------|------|
| SPAA | SNU, KIISE14 | Parallel Algorithms |
| IPSN | SNU, POSTECH | Sensor Networks |
| KR | SNU, KIISE24 | Knowledge Representation |
| DISC | SNU, KIISE24 | Distributed Computing |
| STACS | SNU, KIISE14 | Algorithms |
| SOUPS | SNU, POSTECH | Security & Usability |
| IPDPS | BK21, KIISE24 | Parallel Processing |
| SGP | POSTECH, KIISE24 | Geometry Processing |
| VRST | POSTECH, KIISE24 | VR/HCI |
| MASCOTS | POSTECH, KIISE14 | Simulation |
| EMSOFT | POSTECH, KIISE24 | Embedded SW |
| FC | POSTECH, KIISE24 | Financial Crypto |
| ICSOC | POSTECH, KIISE24 | Service Computing |
| IJCAR | POSTECH, KIISE24 | Automated Reasoning |
| RE | POSTECH, KIISE24 | Requirements Engineering |
| SAS | POSTECH, KIISE24 | Static Analysis |
| NOMS | POSTECH, KIISE14 | Network Operations |
| SRDS | POSTECH, KIISE14 | Reliable Distributed Systems |
| ICPP | BK21, KIISE14 | Parallel Processing |
| CLOUD | POSTECH, KIISE24 | Cloud Computing |
| MASS | POSTECH, KIISE14 | Mobile Ad-hoc Networks |
| ISLPED | POSTECH, KIISE14 | Low Power Design |
| ISPASS | POSTECH, KIISE14 | Performance Analysis |
| IISWC | POSTECH, KIISE14 | Workload Characterization |
| SECON | POSTECH, KIISE14 | Sensor Networks |
| MSST | POSTECH, KIISE14 | Storage |
| ASIACCS | POSTECH, KIISE24 | Security |
| CCGrid | POSTECH, KIISE24 | Grid/Cloud Computing |
| TCC | POSTECH, KIISE24 | Cloud Computing |
| ESOP | POSTECH, KIISE24 | PL |
| ICCD | POSTECH, KIISE14 | Computer Design |
| CC (Compiler) | POSTECH, KIISE24 | Compilers |
| CONCUR | POSTECH, KIISE24 | Concurrency |
| LCTES | POSTECH, KIISE24 | Embedded Systems |
| Euro-Par | POSTECH, KIISE24 | Parallel Processing |

---

## ⚪ 참고 (1개 소스에서만 언급)

| 학회 | 소스 | 분야 |
|------|------|------|
| MLSys | SNU | ML Systems |
| MMSys | POSTECH | Multimedia Systems |
| ACNS | POSTECH | Cryptography |
| CHES | POSTECH | Hardware Security |
| CIDR | POSTECH | Databases |
| ICASSP | POSTECH | Signal Processing |
| ICCPS | POSTECH | Cyber-Physical Systems |
| ICWSM | POSTECH | Social Media |
| IJCNLP | POSTECH | NLP |
| IPMI | POSTECH | Medical Imaging |
| HiPC | POSTECH | HPC |
| ICLP | POSTECH | Logic Programming |

---

## 적용 방법

1. 학회 slug 결정 (예: `ieee-vis`, `rtss`, `rtas`, ...)
2. `src/infrastructure/seed/conferences.json`에 학회 정보 추가
3. `src/infrastructure/seed/deadlines.json`에 데드라인 추가
4. `src/infrastructure/seed/institution-ratings.json`에 기관 태그 추가
5. `pnpm seed` 실행
