import { afterEach, beforeEach, describe, it } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';
import { itemProviders } from '../item-providers.enum';
import { FindOrCreateItemUseCase } from './find-or-create-item-use-case';

describe('FindOrCreateItemUseCase', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const buildItemRepositoryMock = () => ({
    findOrCreate: jest.fn((name) => ({
      id: 1,
      name,
    })),
  });
  let module: TestingModule;
  let useCase: FindOrCreateItemUseCase;
  let repositoryMock: ReturnType<typeof buildItemRepositoryMock>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: itemProviders.ItemRepository,
          useFactory: buildItemRepositoryMock,
        },
        FindOrCreateItemUseCase,
      ],
    }).compile();
    useCase = module.get(FindOrCreateItemUseCase);
    repositoryMock = module.get(itemProviders.ItemRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('uses the repository to create', async () => {
    const result = await useCase.execute({ name: 'item name' });
    expect(repositoryMock.findOrCreate).toHaveBeenCalledWith('item name');
    expect(result).toEqual({ id: 1, name: 'item name' });
  });
});
