export const seoSiteMetrics = {
  organicClicks: 284720,
  organicImpressions: 8420000,
  organicCtr: 3.38,
  avgPosition: 12.4,
  nonBrandClicks: 198340,
  brandClicks: 86380,
  top3QueryCount: 42,
  top10QueryCount: 187,
  page2OpportunityCount: 63,
  lowCtrOpportunityCount: 38,
  decliningPageCount: 24,
  technicalIssueCount: 47,
  indexIssueCount: 8,
  pagespeedRiskCount: 15,
  contentBriefCount: 12,
  approvalPendingCount: 7,
  clicksChange: -4.2,
  impressionsChange: +8.7,
  ctrChange: -1.1,
  positionChange: +0.8,
}

export const seoTrendData = Array.from({ length: 28 }, (_, i) => {
  const date = new Date("2026-06-29")
  date.setDate(date.getDate() - (27 - i))
  const base = 9000 + Math.sin(i * 0.4) * 2000
  return {
    date: date.toISOString().split("T")[0],
    clicks: Math.round(base + (i % 3) * 500 + 1200),
    impressions: Math.round(base * 28 + (i % 5) * 10000),
    position: parseFloat((10 + Math.sin(i * 0.3) * 3 + (i % 2) * 0.5).toFixed(1)),
  }
})

export const mockQueries = [
  { id: "q-001", query: "냉장고 추천", url: "/guides/best-refrigerator", clicks: 8420, impressions: 124000, ctr: 6.79, position: 3.2, prevClicks: 9100, opportunityType: "declining", intent: "commercial", businessValue: "high" },
  { id: "q-002", query: "4도어 냉장고 추천", url: "/refrigerators/4-door", clicks: 3240, impressions: 98000, ctr: 3.31, position: 6.8, prevClicks: 2800, opportunityType: "page2_to_page1", intent: "commercial", businessValue: "high" },
  { id: "q-003", query: "에어컨 추천 2026", url: "/guides/best-aircon", clicks: 5840, impressions: 210000, ctr: 2.78, position: 8.1, prevClicks: 4200, opportunityType: "low_ctr", intent: "commercial", businessValue: "high" },
  { id: "q-004", query: "냉장고 용량 선택", url: "/guides/refrigerator-size", clicks: 2100, impressions: 87000, ctr: 2.41, position: 9.4, prevClicks: 2300, opportunityType: "page2_to_page1", intent: "informational", businessValue: "medium" },
  { id: "q-005", query: "삼성 냉장고 vs LG 냉장고", url: "/compare/samsung-lg-refrigerator", clicks: 1840, impressions: 145000, ctr: 1.27, position: 7.2, prevClicks: 1650, opportunityType: "low_ctr", intent: "commercial", businessValue: "high" },
  { id: "q-006", query: "세탁기 추천", url: "/guides/best-washer", clicks: 4200, impressions: 89000, ctr: 4.72, position: 4.1, prevClicks: 5200, opportunityType: "declining", intent: "commercial", businessValue: "high" },
  { id: "q-007", query: "에어컨 전기세 절약", url: "/tips/aircon-energy-save", clicks: 7840, impressions: 312000, ctr: 2.51, position: 5.6, prevClicks: 6900, opportunityType: "low_ctr", intent: "informational", businessValue: "medium" },
  { id: "q-008", query: "오브제컬렉션 냉장고 가격", url: "/refrigerators/objet", clicks: 2940, impressions: 48000, ctr: 6.13, position: 2.8, prevClicks: 2700, opportunityType: "growing", intent: "transactional", businessValue: "high" },
  { id: "q-009", query: "냉장고 소음 심한 이유", url: "/faq/refrigerator-noise", clicks: 3100, impressions: 94000, ctr: 3.30, position: 11.2, prevClicks: 2800, opportunityType: "page2_to_page1", intent: "informational", businessValue: "low" },
  { id: "q-010", query: "드럼세탁기 통돌이 차이", url: "/compare/drum-vs-topload", clicks: 5200, impressions: 178000, ctr: 2.92, position: 6.4, prevClicks: 4800, opportunityType: "page2_to_page1", intent: "informational", businessValue: "medium" },
  { id: "q-011", query: "냉장고 추천 2026 최신", url: "/guides/best-refrigerator-2026", clicks: 1200, impressions: 92000, ctr: 1.30, position: 8.9, prevClicks: 800, opportunityType: "growing", intent: "commercial", businessValue: "high" },
  { id: "q-012", query: "에어컨 설치비용", url: "/faq/aircon-installation", clicks: 2800, impressions: 67000, ctr: 4.18, position: 5.2, prevClicks: 3400, opportunityType: "declining", intent: "transactional", businessValue: "medium" },
  { id: "q-013", query: "냉장고 정수기 일체형", url: "/refrigerators/with-water-filter", clicks: 1840, impressions: 41000, ctr: 4.49, position: 3.8, prevClicks: 1600, opportunityType: "growing", intent: "commercial", businessValue: "high" },
  { id: "q-014", query: "삼성 비스포크 냉장고 가격", url: "/refrigerators/bespoke", clicks: 4100, impressions: 72000, ctr: 5.69, position: 2.1, prevClicks: 3800, opportunityType: "growing", intent: "transactional", businessValue: "high" },
  { id: "q-015", query: "AI 냉장고란", url: "/blog/ai-refrigerator", clicks: 920, impressions: 58000, ctr: 1.59, position: 12.4, prevClicks: 740, opportunityType: "geo_candidate", intent: "informational", businessValue: "medium" },
]

export const mockPages = [
  { id: "p-001", url: "/guides/best-refrigerator", title: "2026년 냉장고 추천 구매 가이드", clicks: 12400, impressions: 248000, ctr: 5.00, avgPosition: 4.2, sessions: 11800, conversions: 142, conversionRate: 1.20, pageType: "guide", technicalStatus: "ok", lastUpdated: "2026-04-12", seoScore: 78, contentGap: "용량 선택 기준, 가족수별 추천 부족" },
  { id: "p-002", url: "/refrigerators/4-door", title: "4도어 냉장고 전체 라인업", clicks: 8940, impressions: 194000, ctr: 4.61, avgPosition: 6.8, sessions: 8200, conversions: 84, conversionRate: 1.02, pageType: "category", technicalStatus: "ok", lastUpdated: "2026-05-20", seoScore: 71, contentGap: "비교표, FAQ 섹션 없음" },
  { id: "p-003", url: "/guides/best-aircon", title: "에어컨 추천 2026 완전 가이드", clicks: 7840, impressions: 210000, ctr: 3.73, avgPosition: 8.4, sessions: 7200, conversions: 56, conversionRate: 0.78, pageType: "guide", technicalStatus: "ok", lastUpdated: "2026-03-08", seoScore: 62, contentGap: "2026 신제품 반영 안됨, 에너지효율 정보 부족" },
  { id: "p-004", url: "/compare/samsung-lg-refrigerator", title: "삼성 vs LG 냉장고 비교", clicks: 3840, impressions: 187000, ctr: 2.05, avgPosition: 7.2, sessions: 3600, conversions: 28, conversionRate: 0.78, pageType: "compare", technicalStatus: "ok", lastUpdated: "2026-02-14", seoScore: 58, contentGap: "2026 최신 모델 비교 없음, 가격 정보 오래됨" },
  { id: "p-005", url: "/refrigerators/objet", title: "오브제컬렉션 냉장고", clicks: 4200, impressions: 62000, ctr: 6.77, avgPosition: 2.8, sessions: 3900, conversions: 67, conversionRate: 1.72, pageType: "product", technicalStatus: "ok", lastUpdated: "2026-06-01", seoScore: 84, contentGap: "" },
  { id: "p-006", url: "/tips/aircon-energy-save", title: "에어컨 전기세 절약 꿀팁", clicks: 9200, impressions: 348000, ctr: 2.64, avgPosition: 5.6, sessions: 8700, conversions: 34, conversionRate: 0.39, pageType: "article", technicalStatus: "canonical_issue", lastUpdated: "2026-01-20", seoScore: 54, contentGap: "전환 유도 CTA 없음, 관련 제품 링크 없음" },
  { id: "p-007", url: "/faq/refrigerator-noise", title: "냉장고 소음 원인과 해결법", clicks: 4800, impressions: 124000, ctr: 3.87, avgPosition: 11.2, sessions: 4500, conversions: 12, conversionRate: 0.27, pageType: "faq", technicalStatus: "ok", lastUpdated: "2025-11-30", seoScore: 61, contentGap: "200일 이상 미업데이트" },
  { id: "p-008", url: "/compare/drum-vs-topload", title: "드럼 vs 통돌이 세탁기 비교", clicks: 6100, impressions: 198000, ctr: 3.08, avgPosition: 6.4, sessions: 5800, conversions: 45, conversionRate: 0.78, pageType: "compare", technicalStatus: "ok", lastUpdated: "2026-04-22", seoScore: 69, contentGap: "구매 링크 연결 없음" },
]

export const mockTechnicalIssues = [
  { id: "ti-001", url: "/tips/aircon-energy-save", issueType: "canonical_conflict", severity: "high", issue: "canonical이 /blog/aircon-tips를 가리키고 있으나 해당 URL은 404", impactScore: 9, effortScore: 2, owner: "dev", affectedUrls: 1, status: "open", recommendedAction: "canonical을 현재 URL 자신으로 수정" },
  { id: "ti-002", url: "/guides/*", issueType: "missing_structured_data", severity: "medium", issue: "가이드 페이지 12개에 Article/HowTo structured data 없음", impactScore: 7, effortScore: 4, owner: "dev", affectedUrls: 12, status: "open", recommendedAction: "Article schema JSON-LD 추가" },
  { id: "ti-003", url: "/refrigerators/bespoke-old", issueType: "redirect_chain", severity: "high", issue: "/bespoke-old → /bespoke-2025 → /bespoke 3단계 리다이렉트 체인", impactScore: 8, effortScore: 3, owner: "dev", affectedUrls: 1, status: "open", recommendedAction: "301 리다이렉트를 최종 URL로 직접 연결" },
  { id: "ti-004", url: "/category/air-conditioners", issueType: "duplicate_title", severity: "medium", issue: "에어컨 카테고리 페이지 4개의 title이 동일함", impactScore: 6, effortScore: 2, owner: "content", affectedUrls: 4, status: "open", recommendedAction: "페이지별 고유 title 작성" },
  { id: "ti-005", url: "/compare/*", issueType: "low_pagespeed", severity: "medium", issue: "비교 페이지 LCP 평균 4.8초 (목표: 2.5초 이하)", impactScore: 7, effortScore: 7, owner: "dev", affectedUrls: 8, status: "in_progress", recommendedAction: "이미지 최적화, lazy load 적용" },
  { id: "ti-006", url: "/blog/old-posts/*", issueType: "noindex_check", severity: "low", issue: "2024년 이전 블로그 포스트 34개에 noindex 설정 여부 확인 필요", impactScore: 4, effortScore: 3, owner: "content", affectedUrls: 34, status: "open", recommendedAction: "품질 낮은 포스트 noindex, 우수 포스트 색인 유지" },
  { id: "ti-007", url: "/products/discontinued/*", issueType: "404_error", severity: "high", issue: "단종 제품 페이지 11개에서 404 발생, 내부 링크 연결됨", impactScore: 8, effortScore: 4, owner: "dev", affectedUrls: 11, status: "open", recommendedAction: "301 리다이렉트 또는 대체 제품 페이지 안내" },
  { id: "ti-008", url: "/guides/best-refrigerator", issueType: "missing_h1", severity: "low", issue: "h1 태그가 2개 존재 (중복)", impactScore: 3, effortScore: 1, owner: "content", affectedUrls: 1, status: "resolved", recommendedAction: "h1 단일화" },
]

export const mockContentBriefs = [
  {
    id: "brief-001",
    targetUrl: "/guides/best-refrigerator",
    title: "2026 냉장고 추천 구매 가이드 리라이트",
    queryCluster: "냉장고 추천",
    searchIntent: "commercial_investigation",
    status: "pending_approval",
    priority: "high",
    currentGap: ["용량 선택 기준이 없음", "가족 구성원별 추천 없음", "2026 신제품 미반영", "에너지효율 비교 없음"],
    recommendedSections: ["가족 수별 냉장고 용량 선택법", "타입별 비교 (4도어/양문형/상냉동)", "2026 신제품 TOP 5", "구매 체크리스트 10항목", "자주 묻는 질문"],
    titleOptions: ["2026 냉장고 추천: 가족 수·용량·타입별 완벽 선택 가이드", "냉장고 구매 전 꼭 알아야 할 7가지 기준 (2026년 최신)"],
    metaOptions: ["가족 수, 설치 공간, 에너지 효율, 기능별로 냉장고 선택하는 방법을 전문가가 정리했습니다."],
    internalLinks: [{ anchor: "오브제컬렉션 냉장고", url: "/refrigerators/objet" }, { anchor: "4도어 냉장고", url: "/refrigerators/4-door" }],
    structuredData: ["FAQPage", "BreadcrumbList", "Article"],
    confidenceScore: 0.84,
    createdAt: "2026-06-28",
  },
  {
    id: "brief-002",
    targetUrl: "/compare/samsung-lg-refrigerator",
    title: "삼성 vs LG 냉장고 2026 최신 비교",
    queryCluster: "삼성 냉장고 vs LG 냉장고",
    searchIntent: "commercial_investigation",
    status: "in_progress",
    priority: "high",
    currentGap: ["2026 최신 모델 미포함", "가격 정보 오래됨", "에너지 효율 등급 없음", "사용자 리뷰 없음"],
    recommendedSections: ["2026년 주력 모델 스펙 비교표", "가격대별 추천", "에너지 효율 비교", "사용자 만족도", "구매 결정 가이드"],
    titleOptions: ["삼성 vs LG 냉장고 2026: 스펙·가격·에너지 효율 완전 비교", "2026 냉장고 브랜드 비교: 삼성 비스포크 vs LG 오브제"],
    metaOptions: ["삼성과 LG 냉장고의 2026년 최신 모델을 스펙, 가격, 에너지 효율, 디자인 기준으로 비교합니다."],
    internalLinks: [{ anchor: "비스포크 냉장고", url: "/refrigerators/bespoke" }, { anchor: "오브제컬렉션", url: "/refrigerators/objet" }],
    structuredData: ["ComparisonTable (custom)", "FAQPage"],
    confidenceScore: 0.79,
    createdAt: "2026-06-27",
  },
  {
    id: "brief-003",
    targetUrl: "/guides/best-aircon",
    title: "에어컨 추천 2026 가이드 업데이트",
    queryCluster: "에어컨 추천 2026",
    searchIntent: "commercial_investigation",
    status: "pending_approval",
    priority: "medium",
    currentGap: ["2026 신제품 미반영", "인버터 설명 부족", "설치비용 안내 없음", "에너지 절약 팁 없음"],
    recommendedSections: ["2026 에어컨 신제품 TOP 추천", "평수별 BTU 선택 가이드", "인버터 vs 정속형", "설치비용 안내", "에너지 절약 모드 활용법"],
    titleOptions: ["2026 에어컨 추천: 평수별·용량별 완벽 선택 가이드", "에어컨 구매 가이드 2026 - 인버터, 전기세, 설치비 총정리"],
    metaOptions: ["평수, 용도, 전기세를 고려한 2026년 에어컨 추천과 선택 기준을 정리했습니다."],
    internalLinks: [{ anchor: "에어컨 전기세 절약", url: "/tips/aircon-energy-save" }],
    structuredData: ["FAQPage", "HowTo"],
    confidenceScore: 0.76,
    createdAt: "2026-06-26",
  },
]

export const mockGeoQueries = [
  { id: "geo-001", query: "냉장고 용량 어떻게 선택하나요", type: "question", aiAnswerCandidate: true, currentCoverage: "weak", mentions: 0, platform: "ChatGPT", brandMentioned: false },
  { id: "geo-002", query: "삼성 냉장고 vs LG 냉장고 어떤게 좋아요", type: "comparison", aiAnswerCandidate: true, currentCoverage: "none", mentions: 0, platform: "Perplexity", brandMentioned: false },
  { id: "geo-003", query: "에어컨 1등급 2등급 차이", type: "question", aiAnswerCandidate: true, currentCoverage: "partial", mentions: 2, platform: "Gemini", brandMentioned: true },
  { id: "geo-004", query: "4인 가족 냉장고 용량 추천", type: "recommendation", aiAnswerCandidate: true, currentCoverage: "none", mentions: 0, platform: "ChatGPT", brandMentioned: false },
  { id: "geo-005", query: "드럼세탁기 통돌이 세탁기 장단점", type: "comparison", aiAnswerCandidate: true, currentCoverage: "partial", mentions: 1, platform: "Perplexity", brandMentioned: false },
]

export const mockGeoSnapshots = [
  { id: "snap-001", query: "냉장고 추천 브랜드", platform: "ChatGPT", capturedAt: "2026-06-25", brandMentioned: true, sentiment: "positive", citedUrls: ["/guides/best-refrigerator"], competitors: ["삼성전자 공식", "LG전자 공식"] },
  { id: "snap-002", query: "에어컨 에너지 절약 방법", platform: "Perplexity", capturedAt: "2026-06-24", brandMentioned: false, sentiment: "neutral", citedUrls: [], competitors: ["한전 공식", "에너지관리공단"] },
]

export const seoWeeklyReport = {
  period: "2026-06-22 ~ 2026-06-28",
  summary: "이번 주 유기 검색 클릭은 전주 대비 -4.2% 감소했으나, 노출은 +8.7% 증가했습니다. CTR 하락이 주요 원인으로 진단됩니다.",
  topGainers: [
    { query: "냉장고 정수기 일체형", clicksChange: "+15.2%", positionChange: "-0.8" },
    { query: "삼성 비스포크 가격", clicksChange: "+7.8%", positionChange: "-1.2" },
  ],
  topDecliners: [
    { query: "냉장고 추천", clicksChange: "-7.5%", positionChange: "+0.4" },
    { query: "세탁기 추천", clicksChange: "-19.2%", positionChange: "+1.1" },
  ],
  newOpportunities: 8,
  technicalIssuesFound: 3,
  briefsGenerated: 3,
  pendingApprovals: 7,
}
