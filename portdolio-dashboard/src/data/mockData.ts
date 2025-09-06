export interface PortfolioStock {
  id: number;
  name: string;
  symbol: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  exchange: "NSE" | "BSE";
  cmp: number; // abhi mock value
  peRatio?: number;
  latestEarnings?: string;
}

export const portfolioData: PortfolioStock[] = [
  {
    id: 1,
    name: "Infosys Ltd",
    symbol: "INFY",
    sector: "Technology",
    purchasePrice: 1500,
    quantity: 10,
    exchange: "NSE",
    cmp: 1550,
    peRatio: 28.4,
    latestEarnings: "Q1 2025",
  },
  {
    id: 2,
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    sector: "Financials",
    purchasePrice: 1600,
    quantity: 5,
    exchange: "NSE",
    cmp: 1580,
    peRatio: 21.7,
    latestEarnings: "Q1 2025",
  },
  {
    id: 3,
    name: "Reliance Industries",
    symbol: "RELIANCE",
    sector: "Energy",
    purchasePrice: 2400,
    quantity: 8,
    exchange: "BSE",
    cmp: 2450,
    peRatio: 24.2,
    latestEarnings: "Q1 2025",
  },
];
