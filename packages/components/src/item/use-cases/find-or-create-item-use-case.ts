import { Inject, Injectable } from '@nestjs/common';
import { ItemRepository } from '../domain/item-repository';
import { itemProviders } from '../item-providers.enum';

export interface FindOrCreateItemUseCaseRequest {
  name: string;
}

export interface FindOrCreateItemUseCaseResponse {
  id: number;
  name: string;
}

@Injectable()
export class FindOrCreateItemUseCase {
  constructor(
    @Inject(itemProviders.ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute({
    name,
  }: FindOrCreateItemUseCaseRequest): Promise<FindOrCreateItemUseCaseResponse> {
    const item = await this.itemRepository.findOrCreate(name);
    return item;
  }
}
