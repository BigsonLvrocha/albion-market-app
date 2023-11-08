import { type MarketReport } from './market-report';

export interface MarketReportRepository {
  create: (report: MarketReport) => Promise<MarketReport>;
}
