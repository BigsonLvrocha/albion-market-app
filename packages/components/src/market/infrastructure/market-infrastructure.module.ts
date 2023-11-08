import { Module } from '@nestjs/common';
import { marketProvidersEnum } from '../market-providers.enum';
import { MarketModelsModule } from './models/market-models.module';
import { SequelizeMarketReportRepository } from './sequelize-market-report-repository';

@Module({
  imports: [MarketModelsModule],
  providers: [
    {
      provide: marketProvidersEnum.MARKET_REPORT_REPOSITORY,
      useClass: SequelizeMarketReportRepository,
    },
  ],
  exports: [marketProvidersEnum.MARKET_REPORT_REPOSITORY],
})
export class MarketInfrastructureModule {}
