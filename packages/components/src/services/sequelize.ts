import { type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { serviceProviders } from './service-providers.enum';

export const sequelizeProvider: Provider = {
  provide: serviceProviders.SEQUELIZE,
  useFactory: (config: ConfigService) => {
    const dbStorage = config.get<string>('DB_STORAGE_PATH');
    return new Sequelize({
      dialect: 'sqlite',
      storage: dbStorage,
      logging: false,
    });
  },
  inject: [{ optional: false, token: ConfigService }],
};
