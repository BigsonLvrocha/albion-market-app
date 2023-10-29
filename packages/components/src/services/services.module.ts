import { Module } from '@nestjs/common';
import { sequelizeProvider } from './sequelize';
import { serviceProviders } from './service-providers.enum';

@Module({
  providers: [sequelizeProvider],
  exports: [serviceProviders.SEQUELIZE],
})
export class ServicesModule {}
