import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services';
import { serviceProviders } from '../../../services/service-providers.enum';
import { itemProviders } from '../../item-providers.enum';
import { initItemModel } from './item-model';

@Module({
  imports: [ServicesModule],
  exports: [itemProviders.ItemModel],
  providers: [
    {
      provide: itemProviders.ItemModel,
      useFactory: initItemModel,
      inject: [{ optional: false, token: serviceProviders.SEQUELIZE }],
    },
  ],
})
export class ItemModelsModule {}
