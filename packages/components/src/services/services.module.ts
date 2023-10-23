import { Module } from '@nestjs/common';
import { providers } from './providers.enum';
import { sequelizeProvider } from './sequelize';

@Module({
  providers: [sequelizeProvider],
  exports: [providers.SEQUELIZE],
})
export class Services {}
