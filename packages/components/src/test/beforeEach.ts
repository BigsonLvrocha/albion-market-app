import { NestFactory } from '@nestjs/core';
import { ServicesModule, serviceProviders } from '../services';

export async function beforeEach(): Promise<void> {
  const app = await NestFactory.createApplicationContext(ServicesModule);
  const sequelize = app.get(serviceProviders.SEQUELIZE);
  await sequelize.query(`delete from market_reports;`);
  await sequelize.query('delete from items');
  await app.close();
}

await beforeEach();
