import type { PortfolioStock } from "../data/mockData";

export interface SectorGroup {
  sector: string;
  stocks: PortfolioStock[];
  totalInvestment: number;
  totalPresentValue: number;
  netGainLoss: number;
}

export function groupBySector(data: PortfolioStock[]): SectorGroup[] {
  const sectorMap: Record<string, SectorGroup> = {};

  data.forEach((stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.cmp * stock.quantity;
    const gainLoss = presentValue - investment;

    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = {
        sector: stock.sector,
        stocks: [],
        totalInvestment: 0,
        totalPresentValue: 0,
        netGainLoss: 0,
      };
    }

    sectorMap[stock.sector].stocks.push(stock);
    sectorMap[stock.sector].totalInvestment += investment;
    sectorMap[stock.sector].totalPresentValue += presentValue;
    sectorMap[stock.sector].netGainLoss += gainLoss;
  });

  return Object.values(sectorMap);
}
