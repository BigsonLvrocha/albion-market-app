import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { sequelizeProvider } from './sequelize';
import { serviceProviders } from './service-providers.enum';

const dirName = dirname(fileURLToPath(import.meta.url));
const envFilePath = resolve(dirName, '..', '..', '..', '..', '.env');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [resolve(envFilePath)],
    }),
  ],
  providers: [sequelizeProvider],
  exports: [serviceProviders.SEQUELIZE],
})
export class ServicesModule {}
