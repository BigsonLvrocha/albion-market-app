import { type Provider } from '@nestjs/common';
import { join } from 'path';
import { Sequelize } from 'sequelize';
import { serviceProviders } from './service-providers.enum';

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
  provide: serviceProviders.SEQUELIZE,
  useFactory: () => {
    return new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
    });
  },
};
