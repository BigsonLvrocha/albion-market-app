import { Module } from '@nestjs/common';
import { itemProviders } from '../item-providers.enum';
import { ItemModelsModule } from './model/item-models.module';
import { SequelizeItemRepository } from './sequelize-item-repository';

@Module({
  imports: [ItemModelsModule],
  providers: [
    {
      provide: itemProviders.ItemRepository,
      useClass: SequelizeItemRepository,
    },
  ],
})
export class ItemInfrastructureModule {}
