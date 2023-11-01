import { Module } from '@nestjs/common';
import { ItemInfrastructureModule } from './infrastructure/item-infrastructure.module';
import { FindOrCreateItemUseCase } from './use-cases/find-or-create-item-use-case';

@Module({
  imports: [ItemInfrastructureModule],
  providers: [FindOrCreateItemUseCase],
  exports: [FindOrCreateItemUseCase],
})
export class ItemModule {}
