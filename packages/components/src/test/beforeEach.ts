import { NestFactory } from '@nestjs/core';
import { ServicesModule, serviceProviders } from '../services';

export async function beforeEach(): Promise<void> {
  const app = await NestFactory.create(ServicesModule);
  await app.init();
  const sequelize = app.get(serviceProviders.SEQUELIZE);
  await sequelize.query(`
    delete from items;
  `);
  await app.close();
}

await beforeEach();
