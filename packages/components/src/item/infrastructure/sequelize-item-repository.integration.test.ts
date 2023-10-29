import { beforeAll, describe, it } from '@jest/globals';
import { ConfigModule } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../../services';
import { itemProviders } from '../item-providers.enum';
import { ItemInfrastructureModule } from './item-infrastructure.module';
import { type ItemModel } from './model/item-model';
import { type SequelizeItemRepository } from './sequelize-item-repository';

describe('item repository', () => {
  let module: TestingModule;
  let repository: SequelizeItemRepository;
  let model: typeof ItemModel;
  let createdItem: ItemModel;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ServicesModule,
        ItemInfrastructureModule,
      ],
    }).compile();

    repository = module.get<SequelizeItemRepository>(
      itemProviders.ItemRepository,
    );

    model = module.get<typeof ItemModel>(itemProviders.ItemModel);

    createdItem = await model.create({
      name: 'test1',
    });
  });

  it('creates an item', async () => {
    const item = await repository.findOrCreate('test');

    expect(item.name).toBe('test');
    expect(item.id).toBeGreaterThan(0);

    const itemInDb = await model.findByPk(item.id);
    expect(itemInDb).toBeDefined();
    expect(itemInDb?.name).toBe('test');
  });

  it('returns the item if already exists', async () => {
    const item = await repository.findOrCreate('test1');

    expect(item.id).toBe(createdItem.id);
  });
});
