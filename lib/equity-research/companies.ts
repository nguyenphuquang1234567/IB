export interface CompanyFinancials {
  year: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  freeCashFlow: number;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  description: string;
  revenueDrivers: string[];
  marginDrivers: string[];
  financials: CompanyFinancials[];
  marketPrice?: number;
}

export const COMPANIES: Company[] = [
  {
    id: "apple",
    name: "Apple",
    ticker: "AAPL",
    sector: "Technology",
    description: "Designs and sells consumer electronics, software, and services. iPhone, Mac, iPad, Services (App Store, iCloud, Apple Music).",
    revenueDrivers: ["iPhone unit sales and ASP", "Services subscription growth", "Mac and iPad refresh cycles", "Wearables (Apple Watch, AirPods)"],
    marginDrivers: ["Services mix (higher margin)", "Component cost management", "Scale in manufacturing", "Pricing power on premium products"],
    financials: [
      { year: "2020", revenue: 274.6, grossProfit: 104.9, operatingIncome: 66.3, netIncome: 57.4, freeCashFlow: 73.4 },
      { year: "2021", revenue: 365.8, grossProfit: 152.8, operatingIncome: 108.9, netIncome: 94.7, freeCashFlow: 92.9 },
      { year: "2022", revenue: 394.3, grossProfit: 170.8, operatingIncome: 119.4, netIncome: 99.8, freeCashFlow: 111.4 },
      { year: "2023", revenue: 383.3, grossProfit: 169.1, operatingIncome: 114.3, netIncome: 97.0, freeCashFlow: 99.6 },
      { year: "2024", revenue: 391.0, grossProfit: 175.2, operatingIncome: 123.9, netIncome: 107.2, freeCashFlow: 108.5 },
    ],
    marketPrice: 230,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    ticker: "MSFT",
    sector: "Technology",
    description: "Software and cloud services. Azure, Office 365, Windows, LinkedIn, Gaming (Xbox).",
    revenueDrivers: ["Azure cloud growth", "Office 365 and Teams adoption", "Gaming (Activision)", "AI monetization (Copilot)"],
    marginDrivers: ["Cloud scale (Azure margins expanding)", "Software mix vs hardware", "Operating leverage", "Cost discipline"],
    financials: [
      { year: "2020", revenue: 168.1, grossProfit: 118.2, operatingIncome: 69.9, netIncome: 61.3, freeCashFlow: 56.1 },
      { year: "2021", revenue: 198.3, grossProfit: 140.0, operatingIncome: 83.4, netIncome: 72.7, freeCashFlow: 65.2 },
      { year: "2022", revenue: 198.3, grossProfit: 141.0, operatingIncome: 83.4, netIncome: 72.4, freeCashFlow: 63.4 },
      { year: "2023", revenue: 211.9, grossProfit: 151.2, operatingIncome: 88.5, netIncome: 72.4, freeCashFlow: 74.6 },
      { year: "2024", revenue: 245.0, grossProfit: 178.5, operatingIncome: 115.0, netIncome: 88.5, freeCashFlow: 92.0 },
    ],
    marketPrice: 420,
  },
  {
    id: "nvidia",
    name: "Nvidia",
    ticker: "NVDA",
    sector: "Technology",
    description: "GPU and AI chip leader. Data center (AI training/inference), Gaming, Automotive, Professional Visualization.",
    revenueDrivers: ["Data center AI demand", "Gaming GPU cycles", "Automotive design wins", "Enterprise AI software"],
    marginDrivers: ["Data center mix (highest margin)", "Pricing power on H100/H200", "Manufacturing scale", "Software attach"],
    financials: [
      { year: "2020", revenue: 16.7, grossProfit: 10.9, operatingIncome: 4.4, netIncome: 4.4, freeCashFlow: 5.8 },
      { year: "2021", revenue: 26.9, grossProfit: 17.5, operatingIncome: 9.2, netIncome: 9.8, freeCashFlow: 10.0 },
      { year: "2022", revenue: 26.9, grossProfit: 17.2, operatingIncome: 7.4, netIncome: 9.8, freeCashFlow: 7.2 },
      { year: "2023", revenue: 27.0, grossProfit: 16.8, operatingIncome: 5.2, netIncome: 4.4, freeCashFlow: 4.2 },
      { year: "2024", revenue: 60.9, grossProfit: 48.2, operatingIncome: 40.2, netIncome: 29.8, freeCashFlow: 27.0 },
    ],
    marketPrice: 140,
  },
  {
    id: "tesla",
    name: "Tesla",
    ticker: "TSLA",
    sector: "Automotive",
    description: "EV manufacturer and energy storage. Model 3/Y, Cybertruck, FSD, Megapack, Solar.",
    revenueDrivers: ["Vehicle deliveries", "ASP and mix (Cybertruck)", "Energy storage growth", "FSD and services"],
    marginDrivers: ["Scale and manufacturing efficiency", "Battery cost reduction", "Pricing (competitive pressure)", "Regulatory credits"],
    financials: [
      { year: "2020", revenue: 31.5, grossProfit: 6.6, operatingIncome: 1.9, netIncome: 0.7, freeCashFlow: 2.8 },
      { year: "2021", revenue: 53.8, grossProfit: 13.6, operatingIncome: 6.5, netIncome: 5.5, freeCashFlow: 5.0 },
      { year: "2022", revenue: 81.5, grossProfit: 20.9, operatingIncome: 13.7, netIncome: 12.6, freeCashFlow: 7.6 },
      { year: "2023", revenue: 96.8, grossProfit: 17.7, operatingIncome: 8.9, netIncome: 15.0, freeCashFlow: 10.5 },
      { year: "2024", revenue: 96.8, grossProfit: 15.5, operatingIncome: 5.2, netIncome: 7.5, freeCashFlow: 4.2 },
    ],
    marketPrice: 250,
  },
  {
    id: "amazon",
    name: "Amazon",
    ticker: "AMZN",
    sector: "Technology",
    description: "E-commerce and cloud. Retail (1P/3P), AWS, Advertising, Prime, Logistics.",
    revenueDrivers: ["Retail GMV and take rate", "AWS growth", "Advertising", "International expansion"],
    marginDrivers: ["AWS (highest margin)", "Retail operating leverage", "Advertising mix", "Fulfillment efficiency"],
    financials: [
      { year: "2020", revenue: 386.1, grossProfit: 149.2, operatingIncome: 22.9, netIncome: 21.3, freeCashFlow: 31.0 },
      { year: "2021", revenue: 469.8, grossProfit: 186.7, operatingIncome: 24.9, netIncome: 33.4, freeCashFlow: 26.4 },
      { year: "2022", revenue: 514.0, grossProfit: 220.0, operatingIncome: 12.2, netIncome: -2.7, freeCashFlow: -11.6 },
      { year: "2023", revenue: 574.8, grossProfit: 260.0, operatingIncome: 36.9, netIncome: 30.4, freeCashFlow: 36.8 },
      { year: "2024", revenue: 638.0, grossProfit: 295.0, operatingIncome: 58.0, netIncome: 45.0, freeCashFlow: 52.0 },
    ],
    marketPrice: 195,
  },
  {
    id: "costco",
    name: "Costco",
    ticker: "COST",
    sector: "Retail",
    description: "Membership warehouse club. Bulk retail, e-commerce, gas, pharmacy, optical.",
    revenueDrivers: ["Membership fee growth", "Same-store sales", "New warehouse openings", "E-commerce penetration"],
    marginDrivers: ["Membership income (high margin)", "Merchandise mix", "Supply chain efficiency", "Low shrink and theft"],
    financials: [
      { year: "2020", revenue: 166.8, grossProfit: 19.2, operatingIncome: 6.2, netIncome: 4.0, freeCashFlow: 4.4 },
      { year: "2021", revenue: 195.9, grossProfit: 22.5, operatingIncome: 7.3, netIncome: 5.0, freeCashFlow: 5.8 },
      { year: "2022", revenue: 226.9, grossProfit: 26.1, operatingIncome: 8.4, netIncome: 5.8, freeCashFlow: 6.5 },
      { year: "2023", revenue: 242.3, grossProfit: 28.0, operatingIncome: 8.9, netIncome: 6.3, freeCashFlow: 6.8 },
      { year: "2024", revenue: 258.7, grossProfit: 30.2, operatingIncome: 9.8, netIncome: 7.0, freeCashFlow: 7.5 },
    ],
    marketPrice: 850,
  },
];

export function getCompany(id: string): Company | undefined {
  return COMPANIES.find((c) => c.id === id);
}

export function computeGrowthRates(financials: CompanyFinancials[]): {
  revenueGrowth: number[];
  grossMargin: number[];
  operatingMargin: number[];
  fcfMargin: number[];
} {
  const revenueGrowth: number[] = [];
  const grossMargin: number[] = [];
  const operatingMargin: number[] = [];
  const fcfMargin: number[] = [];

  for (let i = 0; i < financials.length; i++) {
    grossMargin.push((financials[i].grossProfit / financials[i].revenue) * 100);
    operatingMargin.push((financials[i].operatingIncome / financials[i].revenue) * 100);
    fcfMargin.push((financials[i].freeCashFlow / financials[i].revenue) * 100);
    if (i > 0) {
      revenueGrowth.push(((financials[i].revenue - financials[i - 1].revenue) / financials[i - 1].revenue) * 100);
    }
  }

  return { revenueGrowth, grossMargin, operatingMargin, fcfMargin };
}
