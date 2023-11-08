import { afterAll, beforeAll, describe } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';
import { Cities } from '../../enums';
import { type Item } from '../../item/domain/item';
import { ItemModule } from '../../item/item.module';
import { FindOrCreateItemUseCase } from '../../item/use-cases/find-or-create-item-use-case';
import { ServicesModule } from '../../services';
import { MarketReport } from '../domain/market-report';
import { marketProvidersEnum } from '../market-providers.enum';
import { MarketInfrastructureModule } from './market-infrastructure.module';
import { type MarketReportModel } from './models/market-report-model';
import { type SequelizeMarketReportRepository } from './sequelize-market-report-repository';

describe('MarketReportRepository', () => {
  let module: TestingModule;
  let repository: SequelizeMarketReportRepository;
  let marketReportModel: typeof MarketReportModel;
  let createItemUseCase: FindOrCreateItemUseCase;
  let item: Item;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MarketInfrastructureModule, ItemModule, ServicesModule],
    }).compile();

    repository = module.get(marketProvidersEnum.MARKET_REPORT_REPOSITORY);
    marketReportModel = module.get(marketProvidersEnum.MARKET_REPORT_MODEL);
    createItemUseCase = module.get(FindOrCreateItemUseCase);

    item = await createItemUseCase.execute({ name: 'test2' });
  });

  afterAll(async () => {
    await module.close();
  });

  it('creates a market report', async () => {
    const report = await repository.create(
      new MarketReport({
        city: Cities.Bridgewatch,
        buyEntries: [
          {
            price: 1,
            quantity: 1,
          },
        ],
        itemId: item.id,
        sellEntries: [
          {
            price: 1,
            quantity: 1,
          },
        ],
      }),
    );

    expect(report).toBeInstanceOf(MarketReport);
    expect(report.id).toBeGreaterThan(0);
    expect(report.city).toBe(Cities.Bridgewatch);
    expect(report.itemId).toBe(item.id);
    expect(report.buyEntries).toHaveLength(1);
    expect(report.sellEntries).toHaveLength(1);
    expect(report.buyWeightedAvg).toBe(1);
    expect(report.sellWeightedAvg).toBe(1);
    expect(report.topBuy).toBe(1);
    expect(report.lowestSell).toBe(1);
    expect(report.createdAt).toBeInstanceOf(Date);
    expect(report.updatedAt).toBeInstanceOf(Date);

    const reportInDb = await marketReportModel.findByPk(report.id);
    expect(reportInDb).not.toBeNull();
  });
});
