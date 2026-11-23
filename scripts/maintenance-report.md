## 주간 업데이트 결과 (2026-11-23)

조사 범위: 마감 임박(14일 이내) 15개 학회 / 앞으로 올 마감이 없는 133개 학회 / 최근 45일 안에 개최했고 2026 수상작이 DB에 없는 22개 학회.
조사 방식: opus 에이전트 9개가 공식 출처를 우선으로 조사. 봇 차단 페이지는 우회하지 않음. 이 단계에서는 파일 수정 없음.

---

### ✅ 데드라인 연장 확인

마감 임박 15개(dasfaa, pods, ccgrid, icaps, pets, osdi, dsn, secon, conext, vldb, middleware, mobisys, noms, rss, socg): **모두 변경 없음.**

- noms 2027: DB의 11-30은 이미 연장된 날짜(원래 11-09). 공식 CFP는 HTTP 418로 차단돼 주최 측 메일링 공지로 확인함.
- secon 2027: 공식 CFP는 HTTP 418로 차단. IEEE ComSoc 목록 기준 11-30으로 DB와 같음. 작년에 연장된 적이 있어 마감 직전 재확인 권장.
- middleware 2027 winter: HotCRP가 "12 AM AoE"로 표기. 저장값 `T00:00:00Z`가 그 시점과 같아서, 원하면 timezone `null` → `"AoE"`로 바꿀 수 있음(선택).

**이번 회차 마감 연장 (133개 조사에서 발견)**
- pakdd 2027: paper_deadline 2026-11-20 → **2026-12-04** 23:59 AoE (연장)
  출처: https://www.pakdd2027.org/pages/dates

---

### 📋 새 CFP / deadline 업데이트

#### 바로 반영 가능 (공식 출처 확인, 6개)

⚠️ cc·ics는 마감이 2주 안이라 우선 반영 대상.

- **cc 2027**: 새 에디션 (마감 12-03 임박). 출처: https://conf.researchr.org/track/CC-2027/CC-2027-research-papers
  ```json
  {"conference_slug": "cc", "year": 2027, "cycle": "main", "abstract_deadline": "2026-12-01T23:59:00Z", "paper_deadline": "2026-12-03T23:59:00Z", "notification_date": "2027-01-20T00:00:00Z", "conference_start": "2027-03-20", "conference_end": "2027-03-21", "venue": "Salt Lake City, UT, USA", "timezone": "AoE"}
  ```
- **ics 2027**: 새 에디션 (마감 12-07 임박, 11-12 점검에서 놓친 항목). 2027은 사이클이 하나. 출처: https://klab-ai3.github.io/ics2027/calls-cfp.html
  ```json
  {"conference_slug": "ics", "year": 2027, "cycle": "main", "abstract_deadline": "2026-12-01T23:59:00Z", "paper_deadline": "2026-12-07T23:59:00Z", "notification_date": "2027-03-12T00:00:00Z", "conference_start": "2027-06-05", "conference_end": "2027-06-08", "venue": "Atlanta, GA, USA", "timezone": "AoE"}
  ```
- **hpdc 2027**: 새 에디션. 출처: https://hpdc.sci.utah.edu/2027/calls-cfp.html
  ```json
  {"conference_slug": "hpdc", "year": 2027, "cycle": "main", "abstract_deadline": "2027-01-11T23:59:00Z", "paper_deadline": "2027-01-18T23:59:00Z", "notification_date": "2027-03-30T00:00:00Z", "conference_start": "2027-06-07", "conference_end": "2027-06-10", "venue": "Atlanta, GA, USA", "timezone": "AoE"}
  ```
- **ase 2027**: 새 에디션. abstract 날짜는 공지에 없음. 출처: https://conf.researchr.org/track/ase-2027/ase-2027-research-track
  ```json
  {"conference_slug": "ase", "year": 2027, "cycle": "main", "abstract_deadline": null, "paper_deadline": "2027-03-10T23:59:00Z", "notification_date": "2027-06-10T00:00:00Z", "conference_start": "2027-10-24", "conference_end": "2027-10-28", "venue": "El Paso, TX, USA", "timezone": "AoE"}
  ```
- **sc 2027**: 새 에디션. 출처: https://sc27.supercomputing.org/all-dates-deadlines/
  ```json
  {"conference_slug": "sc", "year": 2027, "cycle": "main", "abstract_deadline": "2027-03-25T23:59:00Z", "paper_deadline": "2027-04-01T23:59:00Z", "notification_date": "2027-07-01T00:00:00Z", "conference_start": "2027-11-14", "conference_end": "2027-11-19", "venue": "Denver, CO, USA", "timezone": "AoE"}
  ```
- **icse 2028**: 새 에디션. 기존 icse 행처럼 `23:59:59Z`, 부대행사 포함 전체 기간 사용(본회의만은 05-03~05). 출처: https://conf.researchr.org/track/icse-2028/icse-2028-papers
  ```json
  {"conference_slug": "icse", "year": 2028, "cycle": "main", "abstract_deadline": "2027-06-24T23:59:59Z", "paper_deadline": "2027-07-01T23:59:59Z", "notification_date": "2027-10-21T00:00:00Z", "conference_start": "2028-04-29", "conference_end": "2028-05-07", "venue": "Waikoloa, Hawaii, USA", "timezone": "AoE"}
  ```

#### 보류 (잠정값 또는 보조 출처)
- sgp 2027: round1 paper 2027-02-04, round2 paper 2027-04-08, 2027-06-21~25 Singapore. 공식 페이지에 "Submission dates are preliminary"로 적혀 있고 시간대도 미정.
- chi 2028: 2028-05-08~12 Cape Town. 보조 출처뿐이고 공식 사이트는 아직 없음.
- avss 2027: 사이트가 여전히 "proposal 기반, 확정 후 갱신" 상태.
- crypto 2027: CFP 페이지 메타데이터에 submit 2027-02-11이 보이지만 본문은 "TBD".

#### 일정만 공개 (행사만 있는 행 후보, 마감 미발표)
| 학회 | 연도 | 일정 | 장소 | 출처 |
|---|---|---|---|---|
| asiacrypt | 2027 | 12-13~17 | Nagoya, Japan | iacr.org/news/item/30476 |
| iswc | 2027 | 10-24~28 | Montevideo, Uruguay | iswc2027.semanticweb.org |
| assets | 2027 | 10-24~27 | Tokyo, Japan | assets27.sigaccess.org |
| cscw | 2027 | 10-16~20 | Philadelphia, PA, USA | cscw.acm.org/2027 (rolling 투고) |
| icpp | 2027 | 09-13~17 | Sapporo, Japan | icpp2027.github.io |
| codes-isss / cases / emsoft | 2027 | 10-10~15 (ESWEEK 전체 기간) | Long Beach, CA, USA | esweek.org |
| sas | 2027 | 10-10~15 (SPLASH 전체 기간) | Prague, Czechia | 2027.splashcon.org/home/sas-2027 |
| raid | 2027 | 미정 | Chicago, IL, USA | raid2027.org |
| ijcar | 2028 | 7월 (날짜 미정) | Montpellier, France | ijcar.org/conferences |

#### website_url 교체 후보
| 학회 | 새 URL |
|---|---|
| cc | https://conf.researchr.org/track/CC-2027/CC-2027-research-papers |
| ics | https://klab-ai3.github.io/ics2027/calls-cfp.html |
| hpdc | https://hpdc.sci.utah.edu/2027/calls-cfp.html |
| ase | https://conf.researchr.org/track/ase-2027/ase-2027-research-track |
| sc | https://sc27.supercomputing.org/program/papers/ |
| icse | https://conf.researchr.org/track/icse-2028/icse-2028-papers |
| iswc | https://iswc2027.semanticweb.org/ |
| icpp | https://icpp2027.github.io/ |
| raid | https://raid2027.org/ |
| sas | https://2027.splashcon.org/home/sas-2027 |

#### 그 밖에 발견한 것
- hri 2027 장소: DB는 "Santa Clara, CA", SIGCHI 이벤트 목록은 "San Jose, CA". 공식 사이트 확인 필요.
- 나머지 약 110개 학회는 11-12 이후 새 정보 없음.

---

### 🏆 Best Paper 발표

→ best-papers.json에 수동 추가 필요. 수상작별 제목, 저자, URL, 출처는 아래 "상세" 참고.

| 학회 2026 | 본상 | 그 외 | 공식 출처 |
|---|---|---|---|
| atc | best_paper 6 | – | atc.sigops.org/2026/accepted.html |
| ccs | distinguished_paper 23 (CCS는 별도 Best Paper 없음, 기존 DB도 distinguished) | ToT 3 | sigsac.org/ccs/CCS2026/program/awards.html |
| ieee-vis | best_paper 5 (full) + 2 (short) | HM 11 + short HM 2, ToT 5 | ieeevis.org/year/2026/program/content/?type=awards |
| focs | best_paper 3 | best_student_paper(Machtey) 2 | focs.computer.org/2026/main-program/ (Best Paper Session 편성 기준) |
| iccad | best_paper 2 (McCalla front/back-end) | 10년 Most Influential 1 | iccad.com/2026/awards (상장 이미지) |
| vrst | best_paper 2 | HM 3 | vrst.acm.org/vrst2026/awards/ |
| assets | best_paper 1 | best_student_paper 1 | assets26.sigaccess.org/updates.html |
| iccd | best_paper 1 | best_paper_runner_up 1 | iccd-conf.com/2026/awards.html |
| socc | best_paper 1 | HM 1, Best Industry Paper 1 | acmsocc.org/2026/awards.html |
| tcc | Outstanding Paper 3 (DB 첫 레코드라 best_paper / outstanding_paper 중 선택 필요) | Best Young Researcher 1 | tcc.iacr.org/2026/json/program.json |
| issre | 본상 없음 | distinguished_paper 9 | cyprusconferences.org/issre2026/awards/ |

**과거 누락**
- issre 2025 best paper 2편(Research와 Industry 부문). 출처: issre.github.io
  - Research: "Understanding Recommendation System Robustness Against Silent Data Corruption: An Empirical Study", Dongning Ma, Xun Jiao, Fred Lin, Daniel Moore, Sriram Sankar. https://ieeexplore.ieee.org/document/11229674/
  - Industry: "V-Models: LLMs for the Development Lifecycle of Safety-Critical Systems". https://ieeexplore.ieee.org/document/11262339

**변경 없음**
- disc: DB의 2건이 전부.

**미발표 / 미확인 (다음 점검 때 재확인)**
- corl: 중국 기술 매체 기사뿐이고 공식 Awards 페이지는 비어 있음.
- icdm: 시상식은 열렸지만 Paper Awards 페이지가 비어 있음.
- sc: 최종 후보만 공개, 결과 게시 없음.
- aacl: Best Paper 1편과 Outstanding Paper 3편을 선정했지만 명단이 공개된 곳을 못 찾음.
- cikm: Awards 페이지가 "TBA".
- 그 밖에 performance, mascots, mass, isrr, sdm은 발표를 찾지 못함. sdm은 siam.org가 403.
- sdm 2026의 11월 일정(Salt Lake City, IS26과 공동 개최)은 맞는 것으로 확인됨.

#### 상세

**atc 2026** (best_paper)
- SwiftBaton: Dependency-Aware Staged Reconstruction for Live Migration of Stateful Containers. Xianzhi Zhu, Gonggu Chen, Yancan Mao, Richard T. B. Ma, Lulu Yao, Yongkun Li, Yinlong Xu, John C. S. Lui. https://doi.org/10.1145/3828523.3857009
- DeltaBox: Millisecond-Scale Sandbox Checkpoint and Rollback for Stateful AI Agents. Yunpeng Dong, Jingkai He, Shiqi Liu, Yuze Hou, Dong Du, Zhonghu Xu, Si Yu, Baochuan Yang, Yubin Xia, Haibo Chen. https://doi.org/10.1145/3828523.3857015
- Model-as-a-Service in the Wild: Characterizing Production LLM Inference Clusters at Scale. Yiyun Zheng, Lingyun Yang, Yinghao Yu, Guodong Yang, Liping Zhang, Minchen Yu. https://doi.org/10.1145/3828523.3857044
- Lean: Saving OSS Network Cost by Application-Infrastructure Coordination. Qiankun Yue, Kun Qian, Jiashi Lu, Xue Li, Qingchao Luo, Weibin Yan, Zhihong Li, Jianyao Sun, Junping Liang, Yuyao Chen, Liefeng Rong, Jing Zhang, Ensheng Xu, Boyu Ying, Fanghu Zheng, Guangren Chai, Erci Xu, Yuanchao Su, Dennis Cai. https://doi.org/10.1145/3828523.3857056
- Understanding and Detecting Performance Regressions in Modern Open-Source Server Applications. Jinze Si, Xiaoqian Ma, Mingyu Wu, Haibo Chen. https://doi.org/10.1145/3828523.3857106
- Lightweight Memory Tracing via General Binary Analysis and Offline Reconstruction. Ziheng Liu, Steven Swanson. https://doi.org/10.1145/3828523.3857141

**ccs 2026** (distinguished_paper 23편, DOI prefix 10.1145/3830454)
1. On the Pitfalls of Modeling Individual Knowledge. Wojciech Ciszewski, Stefan Dziembowski, Tomasz Lizurej, Marcin Mielniczuk. .3832752
2. Delegating Email Encryption to Gateways: Why Johnny Should Not. Andris Suter-Dörig, Matteo Scarlata, Kenneth Paterson. (URL 미확인)
3. New IND-CPA-D Attacks on BFV and BGV. Hyeongmin Choe, Minsik Kang, Damien Stehlé. .3846665
4. Duty-Free Bits: Projectivizing Garbling Schemes. Nakul Khambhati, Anwesh Bhattacharya, David Heath. .3846724
5. BABE: Verifying Proofs on Bitcoin Made 1000x Cheaper. Sanjam Garg, Dimitris Kolonelos, Mikhail Sergeevitch, Srivatsan Sridhar, David Tse. .3832596
6. Prefix Consensus For Censorship Resilient BFT. Zhuolun Xiang, Andrei Tonkikh, Alexander Spiegelman. (URL 미확인)
7. GPUThor: Amplifying Rowhammer Attacks via Non-Uniform Patterns to Exploit ECC-Protected GPUs. Chris S. Lin, Joyce Qu, Aditya Rajeev, Gururaj Saileshwar. .3846620
8. Hello Again: Exploiting Replay Protected Monotonic Counters to Bruteforce Windows Hello PINs. Christian Werling, Matti Finder, Hans Niklas Jacob, Julian Prein, Niclas Kühnapfel, Jean-Pierre Seifert. .3846631
9. Automated Side-Channel Analysis of Cryptographic Protocol Implementations. Faezeh Nasrabadi, Robert Künnemann, Hamed Nemati. .3832676
10. Fundamental Limitations of Favorable Privacy–Utility Guarantees for DP-SGD. Murat Bilgehan Ertan, Marten van Dijk. .3832629
11. MetaMancer: Practical Tool Selection Attacks against LLM Agents. Wenbin Zhai, Yihao Liu, Dong Wang, Hao Chen, Bin Xiao. .3846793
12. Azkaban: Zero-Knowledge Abstract Analysis for Neural Networks. Sankha Das, Lucien K. L. Ng, Yibin Yang, Vladimir Kolesnikov, Teodora Baluta. (URL 미확인)
13. Good Cache, BAD Cache: Exploiting DNSSEC Validation Failures for DNS Cache Poisoning Attacks. Shiming Liu, Yunyi Zhang, Chaoyi Lu, Baojun Liu, Shuhan Zhang, Donghong Sun, Yong Ma, Linjian Song. .3832699
14. VUPER: Verified ASN.1 UPER Parser. Xiaotian Zhou, Kai Tu, Ali Ranjbar, Yilu Dong, Gang Tan, Syed Rafiul Hussain. .3832737
15. Brewing Under Pressure: More Realistic Tor Flow Correlation Considering Low FPRs. Haeseung Jeon, Yeonseo Cho, Nate Mathews, Rob Jansen, Marc Juarez, Se Eun Oh. .3846708
16. You Can't Talk Your Way Out of Cyber Extortion: An Empirical Study of Ransomware Negotiations. Tom Meurs, Edward Cartwright, Anna Cartwright, Harold Houba, Daniel W. Woods. .3832611
17. Blue Bubbles, Red Flags: Investigating Privacy Leakage in Apple iMessage. Viktor E. Garske, Swantje Lange, Gabriel K. Gegenhuber, David Schmidt, Andreas Noack, Jiska Classen. .3832689
18. Keys on Doormats: Exposed API Credentials on the Web. Nurullah Demir, Yash Vekaria, Georgios Smaragdakis, Zakir Durumeric. .3846651
19. "Only This Time" Illusion: Exposing and Mitigating Stealth Location Tracking in Android's One-Time Permission Modal. Shahriar Rahman Khan, Tariqul Islam, Raiful Hasan. .3846811
20. Forced Execution for Malware Protected by Commercial Virtualization Obfuscators. Yifei Zhan, Yukun Cui, Shuofeng Hao, Dongnan He, Wei You, Bin Liang, Jianjun Huang. .3832741
21. MTEscape: Bypassing Asynchronous Kernel MTE via Conventional Memory Corruption Vulnerabilities. Kyeongmin Kim, Insu Yun. .3846722
22. Characterizing and Detecting Bugs at the Interfaces of OpenBSD Privilege-Separated Programs. Shibo Ai, Shao Chen Zhang, Hugo Lefeuvre, Margo Seltzer. .3846768
23. From Payload to Plugin: Web-Scale Ecosystem Attribution of JavaScript Injection Campaigns. Ravindu De Silva, Nicholas Shao, Yigitcan Kaya, Mingxuan Yao, Yanick Fratantonio, Luca Invernizzi, Christopher Kruegel, Giovanni Vigna. .3846686

**ieee-vis 2026** (best_paper. HM 13편은 조사 결과에 있음)
- Multimodal Data Comprehension: Understanding How Visual-Textual Chains of Information Influence Data Interpretation. Arran Zeyu Wang, Fuling Sun, Danielle Albers Szafir. http://arxiv.org/abs/2607.23489
- CellPrism: A Visual Analytics System for Exploring AI-Driven Virtual Cells in Drug Discovery. Chuhan Shi, Zijian Guo, Zelin Zang, Chengbo Zheng, Ding Ding, Rui Sheng. http://arxiv.org/abs/2608.01669
- Skeleton: Visual Authoring of Non-visual Data Experiences. Frank Elavsky, Chieri J Nnadozie, Lucas Nadolskis, Patrick Carrington, Dominik Moritz. http://arxiv.org/abs/2607.14579
- EXaCTz: Guaranteed Extremum Graph and Contour Tree Preservation for Distributed and GPU-Parallel Lossy Compression. Yuxiao Li, Mingze Xia, Xin Liang, Bei Wang, Hanqi Guo. http://arxiv.org/abs/2604.01397
- ProgressiVis: A Language and Environment for Progressive Data Analysis and Visualization. Jean-Daniel Fekete, Christian Poli.
- (short) Made to Feel: How Designers Bring Emotions into Affective Visualization. Yixin Bai, Ziyi Wang, Keke Wu, Fumeng Yang. http://arxiv.org/abs/2607.01593
- (short) Visualization Color Repair: A Browser Extension for Colorblind Users. Ayan Nath, Alex Kale.

**focs 2026**
- best_paper: Rational degree is polynomially related to degree. Robin Kothari, Matt Kovacs-Deak, Daochen Wang, Rain Zimin Yang. https://arxiv.org/abs/2601.08727
- best_paper: Approximation Algorithms for Matroid-Intersection Coloring with Applications to Rota's Basis Conjecture. Stephen Arndt, Benjamin Moseley, Kirk Pruhs, Chaitanya Swamy, Michael Zlatin. https://arxiv.org/abs/2604.03735
- best_paper: The Four Color Theorem with Linearly Many Reducible Configurations and Near-Linear Time Coloring. Yuta Inoue, Ken-ichi Kawarabayashi, Atsuyuki Miyashita, Bojan Mohar, Carsten Thomassen, Mikkel Thorup. https://arxiv.org/abs/2603.24880
- best_student_paper: Flip Distance Between Triangulations of Convex Polygons is NP-Complete. Joseph Dorfer. https://arxiv.org/abs/2602.22874
- best_student_paper: Parity ∉ QAC0 ⇔ QAC0 is Fourier-Concentrated. Lucas Gretta, Meghal Gupta, Malvika Raj Joshi. https://arxiv.org/abs/2604.02793

**iccad 2026** (best_paper)
- Adapting DNNs to Embrace Voltage Scaling Induced Errors via Accumulation-Aware Quantization. Alexis Maras, Panagiotis Chaidos, Georgios Alexandris, Dimitrios Soudris, Sotirios Xydis. https://arxiv.org/abs/2610.33824
- NeuroAbs: A Neuro-Symbolic RTL Abstraction Framework for Property Checking Acceleration. Zhiyuan Yan, Xiaofeng Zhou, Ziyue Zheng, Ziyi Yang, Wenbin Che, Wei Zhang, Yangdi Lyu, Hongce Zhang. https://arxiv.org/abs/2608.17304

**vrst 2026**
- best_paper: SpatialSlides: Integrating Presentation Software with Extended Reality for Contextualized 3D Exploration. Jung Who Nam, Vuthea Chheang, Haichao Miao. https://doi.org/10.1145/3822517.3848671
- best_paper: Your Place or Mine? The Influence of Sharing Environmental Context on Social Presence in Remote Extended Reality Interaction. Jonah-Noël Kaiser, Elias Scharlach, Jonathan Kutter, Eric Landwehr, Simon Kimmel, Wilko Heuten. https://doi.org/10.1145/3822517.3848687
- honorable_mention 3편: .3848727 / .3848684 / .3848725

**assets 2026**
- best_paper: Invoking Nemo: Designing and Evaluating a Custom Voice Assistant for People with Intellectual and Developmental Disabilities. Madhuka Nadeeshani, Jacqueline Johnstone, Kirsten Ellis, Swamy Ananthanarayan. https://doi.org/10.1145/3797867.3828995
- best_student_paper: "It's Like Drinking from a Fire Hose": Understanding and Characterizing Video Learning Experiences for Individuals with ADHD. Hanxiu 'Hazel' Zhu, Weiyu Zhang, Ru Wang, Yuhang Zhao. https://doi.org/10.1145/3797867.3829061

**iccd 2026**
- best_paper: High-Performance Low-Power Adiabatic Systolic Array Design in Advanced FinFET Nodes. Jun Yin, Liangtao Dai, Yimin Gao, Mircea R. Stan. http://arxiv.org/abs/2608.30058
- best_paper_runner_up: TileCache: Hardware-Software Co-design for Tile-wise Selective Cache Reuse in Video Diffusion Transformers. Huayang Yuan, Boyin Jin, Guowei Zhu, Yunkai Zhu, Liming Deng, Wei Cao, Fan Zhang.

**socc 2026**
- best_paper: Helix: A Flexible and Scalable NextGen Cellular Core. Bilal Saleem, Omar Basit, Jiayi Meng, Ajay Lotan Thakur, Iftekhar Alam, Christian Maciocco, Y. Charlie Hu, Larry Peterson, Muhammad Shahbaz.
- honorable_mention: The Kernel Always Knows: Understanding Isolation via Kernel Objects. Anjali, Michael M. Swift. https://doi.org/10.1145/3815789.3827955

**tcc 2026** (Outstanding Paper)
- Field Switching in Learning Parity with Noise. Marshall Ball, Saroja Erabelli, Mingyuan Wang, Zhiheng Wang. https://doi.org/10.1007/978-3-032-43588-0_14
- A Complexity-Theoretic Approach to Proofs of Space. Marshall Ball, Jiaxin Guan. https://doi.org/10.1007/978-3-032-43617-7_16
- A Simplified Round-by-round Soundness Proof of FRI. Albert Garreta, Nicolas Mohnblatt, Benedikt Wagner. https://doi.org/10.1007/978-3-032-43624-5_12
- best_paper_early_career: Certified-Everlasting Quantum NIZK Proofs. Nikhil Pappu. https://doi.org/10.1007/978-3-032-43624-5_8

**issre 2026**: 본상 없이 distinguished_paper 9편 (Research 5, RENE 1, Industry 3). 목록은 cyprusconferences.org/issre2026/awards/ 참고.

---

### 다음 점검 우선순위
- 마감 직전 재확인: secon, noms (공식 페이지 차단)
- CFP가 곧 나올 것: sigmod 2028 (round1 관례상 1월), crypto 2027, i3d 2027, uai 2027, esorics 2027 winter
- best paper 재확인: corl, icdm, sc, aacl, cikm, tcc 공식 명칭

---
적용하려면: deadlines.json 수정 후 `npx pnpm seed`
