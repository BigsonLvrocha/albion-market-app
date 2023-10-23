import { type Provider } from '@nestjs/common';
import { join } from 'path';
import { Sequelize } from 'sequelize';
import { providers } from './providers.enum';

const dbPath = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'storage',
  'db',
  'db.sqlite',
);

export const sequelizeProvider: Provider = {
  provide: providers.SEQUELIZE,
  useFactory: () => {
    return new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
    });
  },
};
