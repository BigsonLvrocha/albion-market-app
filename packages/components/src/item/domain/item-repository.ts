import { type Item } from './item';

export interface ItemRepository {
  findOrCreate: (name: string) => Promise<Item>;
}
