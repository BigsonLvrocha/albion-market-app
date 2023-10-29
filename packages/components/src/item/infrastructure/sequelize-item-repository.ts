import { Inject, Injectable } from '@nestjs/common';
import { type Item } from '../domain/item';
import { type ItemRepository } from '../domain/item-repository';
import { itemProviders } from '../item-providers.enum';
import { type ItemModel } from './model/item-model';

@Injectable()
export class SequelizeItemRepository implements ItemRepository {
  constructor(
    @Inject(itemProviders.ItemModel)
    private readonly itemModel: typeof ItemModel,
  ) {}

  async findOrCreate(name: string): Promise<Item> {
    const [item] = await this.itemModel.findOrCreate({
      where: { name },
    });
    return item;
  }
}
