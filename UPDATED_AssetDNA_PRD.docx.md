# AssetDNA PRD 

**Product Name:** Merava – AssetDNA Module

*Document Version: v0.6 (Draft)*

**Last Updated:** May 24, 2025

**Author:** Lee 

# **Revision History**

| Version | Date | Key Changes |
| :---- | :---- | :---- |
| v0.1 | 23 May 2025 | Initial DDB PRD skeleton (secure storage, licensing, marketplace). |
| v0.2 | 24 May 2025 | Introduced AssetDNA blockchain identity layer; expanded goals/metrics. |
| v0.3 | 24 May 2025 | Merged missing platform features (storage, versioning, marketplace, collaboration). |
| v0.4 | 24 May 2025 | Narrowed scope to DNA‑First MVP; added phased roadmap. |
| v0.5 | 24 May 2025 | Re‑introduced Guardian, Marketplace, Collaboration phases while keeping DNA‑First focus. |
| v0.6 | 24 May 2025 | Added DR targets, custodial‑key UX, resumable uploads, licence templates, rotating WebGL preview, funnel KPI; FE‑0 login page \+ FE‑1…FE‑6 backlog; linked demo wireframe. |

# **Current Revision Note (v0.6)**

Patched v0.5 to close all identified gaps and added login/auth page (FE‑0).

Demo UI wireframe is documented separately – see AssetDNA Demo Wireframe canvas doc.

# **Purpose & Vision**

Deliver a creator‑centric identity layer that:

1. Authenticates every avatar via an immutable “DNA ID.”  
2. Enables composable derivatives (token‑bound wardrobes).  
3. Scales into licensing, royalties, and deep‑fake policing.  
4. Empowers creators, agencies, and studios to control & monetize likenesses.

# **2  Phased Delivery Strategy**

| Phase | Name | Core Deliverables | Target Date |
| :---- | :---- | :---- | :---- |
| \*\*P0\*\* | Proof‑of‑Concept | Hardhat tests, duplicate‑hash rejection demo | Jul 15 2025 |
| \*\*P1\*\* | \*\*AssetDNA Alpha (DNA‑First MVP)\*\* | Login/auth page • Upload → SHA‑256 → ERC‑721 mint • ERC‑6551 wardrobe • Rotating WebGL preview • FE‑0…FE‑6 backlog | Sep 15 2025 |
| \*\*P2\*\* | Audit & Mainnet Beta | Trail‑of‑Bits audit • Polygon mainnet • KPI funnel dashboard | Nov 1 2025 |
| \*\*P3\*\* | Guardian \+ Marketplace Beta | pHash crawler • \`AssetDNAGuardian\` • Search \+ Stripe checkout • Licence templates | Feb 15 2026 |
| \*\*P4\*\* | Collaboration & Analytics | RBAC • version diff • metrics dashboards | May 1 2026 |
| \*\*GA\*\* | Full DDB Launch | SOC 2 • SLA • 500 creators • 5 enterprise studios | Jul 30 2026 |

## 

## **2.1 Scope Clarifications — Facial & Audio Alterations** 

| Item | v1 Coverage | Complexity & Risk | Decision |
| :---- | :---- | :---- | :---- |
| Wardrobe swaps | Included under “Dynamic Asset Variants” | Low: texture / mesh overlay only | Keep in v1 |
| Facial re‑sculpt & expression edits | Not yet specified | Blend‑shape library; talent re‑approval likely | Defer to v1.1 |
| Voice / audio likeness | Out of scope | Separate SAG‑AFTRA rights; new TTS stack | Target v2 |

### **Action Items**

1. Update this section to state “advanced facial edits begin in Phase 1.1; audio likeness in Phase 2.”  
2. Legal: draft rider covering voice‑clone and facial‑alteration rights; due Sprint 3\.  
3. Architecture: reserve API stub for voice‑clone micro‑service (gRPC, auth tokens).  
4. Backlog: create “Audio Likeness Module” epic → Icebox; link to risk register.

# **3  Goals & Success Metrics**

| KPI | P1 Target | P2 Target | P3 Target | GA Target |
| :---- | :---- | :---- | :---- | :---- |
| Time-to-DNA | ≤ 5 min | ≤ 3 min | ≤ 3 min | ≤ 2 min |
| Duplicate collisions | 0 | 0 | 0 | 0 |
| Upload → Mint conversion | 60 % | 70 % | 75 % | 80 % |
| Pilot creators onboard | 50 | 100 | 200 | 1,000 |
| Monthly licences | – | – | ≥ 50 | ≥ 500 |
| Guardian resolution rate | – | – | ≥ 90 % / 72 h | ≥ 95 % |
| ARR | – | $25 K | $50 K | $500 K |

# **4  Functional Requirements**

## **4.1 P1 – DNA‑First MVP**

| ID | Requirement |
| :---- | :---- |
| FE‑0 | Login / auth page (email \+ OTP or wallet‑connect) |
| IB‑1 | SHA‑256 hash \+ registerAsset() (ERC‑721\) |
| IB‑2 | Duplicate hash check (revert on collision) |
| IB‑3 | Auto‑spawn ERC‑6551 wallet for root token |
| IB‑4 | Mint child NFTs into token wallet |
| IB‑5 | React uploader → Lambda hash service (≤ 1 GB, resumable) |
| IB‑6 | JS SDK: verifyAsset(file) & getWardrobe(tokenId) |
| IB‑7 | Custodial wallet fallback via AWS KMS \+ delegate‑cash pattern |
| FE‑1 | Drag‑and‑drop S3 uploader with progress bar |
| FE‑2 | Client‑side hash preview for small files |
| FE‑3 | Tx status hook \+ progress component |
| FE‑4 | Rotating WebGL GLTF viewer (react‑three/fiber) |
| FE‑5 | Wardrobe tree UI (child token list) |
| FE‑6 | Deploy demo to Vercel (demo.assetdna.xyz) |
| SE‑1 | OpenZeppelin upgrade‑safe patterns \+ unit tests |
| SE‑2 | Independent security audit |
| DR‑1 | Cross‑region S3 replication • nightly IPFS audit • RPO ≤ 4 h • RTO ≤ 1 h |

## **4.2 P3 – Guardian \+ Marketplace**

| ID | Requirement |
| :---- | :---- |
| GU‑1 | Python crawler with pHash \+ Hamming distance |
| GU‑2 | \`AssetDNAGuardian\` contract → \`InfringementReported\` events |
| MP‑1 | Faceted search (keywords, poly‑count, licence type) |
| MP‑2 | Stripe Connect checkout • instant licence PDF |
| MP‑3 | Royalty accrual & dashboard |
| LP‑1 | Pre‑vetted licence & likeness‑rights templates |

## **4.3 P4 – Collaboration & Analytics**

| ID | Requirement (P4 scope) | Priority | Notes |
| :---- | :---- | :---- | :---- |
| CO-1 | Org hierarchy & roster model – agencies ↔ talent ↔ assets | P0 | Tree-view selector in dashboard; drives RBAC. |
| CO-2 | Role-based access control (RBAC) – view / comment / licence / admin | P0 | Uses Cognito groups \+ contract-level allow-lists. |
| CO-3 | Viewport annotations on the WebGL viewer (arrows, text call-outs) | P1 | Saves as JSON \+ timestamp; versioned per asset. |
| CO-4 | Threaded comments & @mentions with e-mail / Slack notifications | P1 | Stored in DynamoDB; real-time via WebSocket. |
| CO-5 | File-level version diff & rollback (geometry \+ texture) | P1 | S3 object-versioning; diff-viewer highlights changed verts. |
| MR-1 | Event pipeline – capture downloads, views, licences → Kinesis | P0 | Feeds analytics dashboards & Guardian heuristics. |
| MR-2 | Creator analytics dashboard (uploads, royalties, duplicate flags) | P1 | Built in React \+ AWS QuickSight embed. |
| MR-3 | Enterprise BI export – daily Parquet dump to S3 / Snowflake | P2 | Enables studios to join usage data with internal KPIs. |

# **5  Non‑Functional Requirements**

| Category | Requirement |
| :---- | :---- |
| Performance | p95 API latency \< 300 ms • resumable uploads up to 1 GB |
| Security | SOC 2 road‑map • audited contracts • custodial‑key encryption |
| Disaster Recovery | RPO ≤ 4 h • RTO ≤ 1 h • multi‑region S3 \+ IPFS audit |

# **6 System Architecture Snapshot**

 ┌─────────────────────────────────────────────────────────────┐  
 │               1\. Front-End (Next.js / Vercel)               │  
 │  • Drag-and-drop uploader  • WebGL viewer (r-three/fiber)   │  
 └──────────────┬───────────────────────────────┬──────────────┘  
                │ REST/WS                       │ Auth (Cognito)  
                ▼                               ▼  
        ┌──────────────────────────┐    ┌─────────────────────┐  
        │ 2\. API Gateway (HTTPS)   │    │ 2a. Cognito \+ JWT   │  
        └──────────────┬───────────┘    └────────────┬────────┘  
                       │                                
                ┌──────▼─────────────────────────────────────────────────────┐  
                │           3\. AWS Lambda Layer (Node & Python)              │  
                │  • Hash-calc        • Tx relay (ethers.js)                 │  
                │  • 6551 wallet ops  • Guardian crawler sched. (P3)         │  
                └──────┬──────────────────────────┬──────────────────────────┘  
                       │                          │  
        ┌──────────────▼──────────────┐  ┌────────▼───────────┐  
        │ 4\. DynamoDB (Asset index)   │  │ 5\. Kinesis (Events)│  
        └──────────────┬──────────────┘  └────────┬───────────┘  
                       │ Streams (P2)             │  
                       ▼                          ▼  
                ┌──────────────┐            ┌───────────────┐  
                │ 6\. Athena /  │            │ 6a. QuickSight│  
                │   S3 Lake    │            │   Dashboards  │  
                └──────────────┘            └───────────────┘  
                         
▼ On-chain & Storage \-------------------------------------------------------------

    ┌──────────────────────────────┐    ┌──────────────────────────┐  
    │ 7\. Polygon PoS (AWS MB)      │    │ 8\. IPFS Cluster (EKS)    │  
    │ • AssetDNARegistry (ERC-721) │    │ • Dual-pin ↔ S3 backup   │  
    │ • ERC-6551 registry          │    │ • Nightly pin audit      │  
    └──────────────────────────────┘    └──────────────────────────┘

External integrations  
────────────────────────────────────────────────────────────────  
• Stripe Connect – payouts & licence purchases (Phase 3\)    
• E-mail Webhooks – Guardian & @mention alerts    
• Sourcegraph Cody / Cursor – developer-IDE AI tools    

# **7  Security & Compliance Plan**

* Phase P1: custodial‑key KMS; OWASP scan of upload endpoints.  
* Phase P3: add GDPR erase workflow; DMCA automation.

# **8  Risks & Mitigation**

| Risk | Phase | Mitigation |
| :---- | :---- | :---- |
| Failed large‑file resumptions | P1 | Implement multipart S3 retries via tus‑protocol |

# **9  Open Questions**

1\. Chain selection (Polygon vs Base) – lock post‑P0.

2\. pHash threshold tuning – pilot during P3.

3\. Royalty split defaults for Stripe Connect.

4\. Need full WebGL rig preview vs static rotation?

# **Royalty Extension Addendum (v0.7)**

Added: May 24, 2025

## **A. New Phase — R: Royalty Extension**

| Phase | Name | Core Deliverables | Target Date |
| :---- | :---- | :---- | :---- |
| R | Royalty Extension | Usage Fingerprint • Ping API • Creator Dashboard • Partner Webhooks • Optional Payout Ledger | Pilot Q4 2025; GA H2 2026 |

## **B. Functional Requirements — Royalty Engine**

| ID | Requirement | Phase | Notes |
| :---- | :---- | :---- | :---- |
| RE‑1 | Fingerprint embedder for GLTF/FBX exports | R‑0 |  |
| RE‑2 | Usage Ping API \`/track?assetID\` | R‑0 | Returns signed receipt |
| RE‑3 | Creator Royalty Dashboard v1 (usage logs) | R‑1 |  |
| RE‑4 | Partner Webhooks for daily usage feeds | R‑2 |  |
| RE‑5 | Earnings CSV export | R‑2 |  |
| RE‑6 | Smart‑contract payout ledger (optional) | R‑3 | Depends on partner needs |

## **STP Additions (v8+)**

The following requirements integrate the Sentinel Twin Protocol:

* STP-1 – Dual-Fingerprint Gate (SHA-256 \+ embedding) with similarity threshold block.  
* STP-2 – Auto-create ERC-6551 token-bound wallet for rights storage.  
* STP-3 – Resilient mesh/image watermark injected post-mint with ≥ 98% decode rate.  
* NFR-SPEED – STP pipeline ≤ 500 ms for \<50 MB assets.  
* NFR-UNBREAKABLE – Fingerprint survives ≥ 95% typical conversions.

\---

*End of PRD v0.6*