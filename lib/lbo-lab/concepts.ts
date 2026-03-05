export interface PEConcept {
  id: string;
  title: string;
  explanation: string;
  diagramType?: "lbo-lifecycle" | "capital-structure" | "value-drivers" | "exit-strategies" | "deal-flow";
  realWorldExample: string;
  mistakes: string[];
}

export const PE_FUNDAMENTALS: PEConcept[] = [
  {
    id: "leveraged-buyouts",
    title: "Leveraged Buyouts",
    explanation:
      "A leveraged buyout (LBO) is an acquisition financed primarily with debt, using the target company's assets and cash flows as collateral. The PE sponsor contributes a minority of equity (typically 30–50%) and borrows the rest. Debt amplifies returns: if the company grows, equity value increases faster because the sponsor owns 100% of the upside with less capital at risk.",
    diagramType: "capital-structure",
    realWorldExample:
      "KKR's 1989 buyout of RJR Nabisco for $31B was one of the largest LBOs. The deal used ~90% debt. While it faced challenges, it demonstrated how PE firms use leverage to acquire companies larger than their equity base.",
    mistakes: [
      "Over-leveraging companies with volatile cash flows",
      "Ignoring covenant headroom and refinancing risk",
      "Assuming debt is 'free' without modeling interest coverage",
    ],
  },
  {
    id: "pe-lifecycle",
    title: "Private Equity Investment Lifecycle",
    explanation:
      "The PE lifecycle spans sourcing, due diligence, acquisition, value creation, and exit—typically over 4–7 years. Sponsors source deals through proprietary networks, auctions, or add-ons. After acquisition, they work with management to improve operations, then exit via sale or IPO to realize returns.",
    diagramType: "lbo-lifecycle",
    realWorldExample:
      "Blackstone's investment in Hilton Hotels: acquired in 2007, navigated the financial crisis, improved operations and brand, and exited via IPO in 2013—generating ~2.5x MOIC.",
    mistakes: [
      "Underestimating the time required for operational improvements",
      "Failing to plan exit strategy at entry",
      "Overpaying and leaving no margin for error",
    ],
  },
  {
    id: "capital-structure",
    title: "Capital Structure in Buyouts",
    explanation:
      "Buyout capital structures typically include: (1) Senior secured debt (bank loans, revolver)—lowest cost, first lien; (2) Subordinated debt (mezzanine, high-yield)—higher cost, junior claim; (3) Sponsor equity—highest risk, highest return. The mix depends on the target's cash flow stability and growth profile.",
    diagramType: "capital-structure",
    realWorldExample:
      "A stable industrial company might support 5–6x debt/EBITDA with 60% senior, 20% subordinated, 20% equity. A cyclical business might only support 3–4x with more equity.",
    mistakes: [
      "Using the same leverage multiple across all industries",
      "Ignoring debt maturity and refinancing timing",
      "Not stress-testing interest coverage in downturns",
    ],
  },
  {
    id: "investment-horizon",
    title: "Investment Horizon and Exit Strategies",
    explanation:
      "PE funds typically target 4–7 year holds. Exit options include: (1) Strategic sale—sell to a corporate buyer; (2) Secondary buyout—sell to another PE firm; (3) IPO—take the company public; (4) Dividend recap—refinance and distribute cash. The chosen exit affects valuation and timing.",
    diagramType: "exit-strategies",
    realWorldExample:
      "Strategic buyers often pay premium multiples for synergies. Secondary buyouts are common when the company needs more time. IPOs work for large, high-growth companies with public comps.",
    mistakes: [
      "Assuming exit multiple equals entry multiple",
      "Ignoring market timing and cycle risk",
      "Not modeling multiple exit scenarios",
    ],
  },
  {
    id: "value-creation",
    title: "Value Creation in Private Equity",
    explanation:
      "PE returns come from: (1) Revenue growth—organic or M&A; (2) Margin expansion—cost cuts, pricing power; (3) Multiple expansion—improving the business profile; (4) Debt paydown—reducing leverage increases equity value. The best deals combine multiple levers.",
    diagramType: "value-drivers",
    realWorldExample:
      "A PE firm might buy a fragmented industry player, consolidate competitors (add-on acquisitions), cut corporate overhead, and improve procurement—driving both revenue and margin growth.",
    mistakes: [
      "Relying solely on multiple expansion (speculative)",
      "Overestimating synergy realization in roll-ups",
      "Ignoring competitive response to cost cuts",
    ],
  },
  {
    id: "interest-coverage",
    title: "Interest Coverage in LBOs",
    explanation:
      "Interest Coverage = EBIT / Interest Expense. Lenders typically require 1.5–2x minimum at close. As debt is paid down, coverage improves. Stress-test: what if EBITDA falls 20%? Coverage below 1x means the company cannot service debt from operations.",
    diagramType: "capital-structure",
    realWorldExample:
      "A deal with 2.0x coverage at close has limited cushion. A recession could push EBITDA down and trigger covenant breaches. Sponsors model downside cases before signing.",
    mistakes: [
      "Using EBITDA instead of EBIT for coverage",
      "Ignoring step-ups in interest rates",
      "Not stress-testing for downturns",
    ],
  },
  {
    id: "add-on-acquisitions",
    title: "Add-On Acquisitions (Roll-Up)",
    explanation:
      "PE firms often buy a platform company, then acquire smaller add-ons to build scale. Add-ons can be cheaper (no auction) and create synergies (overhead consolidation, purchasing power). Roll-up strategy drives revenue and margin growth.",
    diagramType: "value-drivers",
    realWorldExample:
      "A PE-backed dental practice group acquires 20 single practices over 3 years. Shared back-office, bulk supplies, and brand create value. Exit to strategic or larger PE at higher multiple.",
    mistakes: [
      "Overpaying for add-ons (no synergy capture)",
      "Underestimating integration costs",
      "Ignoring cultural and operational fit",
    ],
  },
  {
    id: "dividend-recap",
    title: "Dividend Recapitalization",
    explanation:
      "A dividend recap is when the company raises new debt and distributes the proceeds to the PE sponsor. It returns capital early without selling. Increases leverage and risk. Used when the business is performing well and can support more debt.",
    diagramType: "exit-strategies",
    realWorldExample:
      "After 2 years, EBITDA grew 30%. Sponsor does a $50M recap, taking cash off the table. Remaining equity still has upside. Total return = dividends + exit.",
    mistakes: [
      "Recapping too early (covenant risk)",
      "Ignoring refinancing risk",
      "Over-leveraging for a one-time distribution",
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence in PE",
    explanation:
      "Due diligence validates the investment thesis. Financial DD: quality of earnings, working capital, debt-like items. Commercial DD: market size, competitive position. Operational DD: cost structure, management. Legal: contracts, litigation. Findings affect purchase price and structure.",
    diagramType: "lbo-lifecycle",
    realWorldExample:
      "DD uncovers customer concentration (top 3 = 60% revenue). Sponsor negotiates price reduction or requires management to diversify before close.",
    mistakes: [
      "Rushing DD to meet auction timeline",
      "Ignoring quality of earnings adjustments",
      "Not involving operations team early",
    ],
  },
];
