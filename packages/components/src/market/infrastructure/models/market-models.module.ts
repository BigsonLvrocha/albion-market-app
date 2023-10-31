import { Module } from '@nestjs/common';
import { marketProvidersEnum } from '../../market-providers.enum';
import { initMarketReportModel } from './market-report-model';

@Module({
  providers: [
    {
      provide: marketProvidersEnum.MARKET_REPORT_MODEL,
      useFactory: initMarketReportModel,
    },
  ],
  exports: [marketProvidersEnum.MARKET_REPORT_MODEL],
})
export class MarketModelsModule {}
