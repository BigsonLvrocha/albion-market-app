import { Inject, Injectable } from '@nestjs/common';
import { MarketReport } from '../domain/market-report';
import { type MarketReportRepository } from '../domain/market-report-repository';
import { marketProvidersEnum } from '../market-providers.enum';
import { type MarketReportModel } from './models/market-report-model';

@Injectable()
export class SequelizeMarketReportRepository implements MarketReportRepository {
  constructor(
    @Inject(marketProvidersEnum.MARKET_REPORT_MODEL)
    private readonly marketReportModel: typeof MarketReportModel,
  ) {}

  async create(report: MarketReport): Promise<MarketReport> {
    const marketReport = await this.marketReportModel.create({
      city: report.city,
      itemId: report.itemId,
      buyEntries: report.buyEntries,
      sellEntries: report.sellEntries,
      buyWeightedAvg: report.buyWeightedAvg,
      sellWeightedAvg: report.sellWeightedAvg,
      topBuy: report.topBuy,
      lowestSell: report.lowestSell,
    });

    return new MarketReport(marketReport.get({ plain: true }));
  }
}
