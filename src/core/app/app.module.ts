import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../shared/database';

import { CategoriesModule } from '../../categories';
import { SpecificationsModule } from '../../specifications';
import { ManageModule } from '../../manage';
import { DoModule } from '../../do';

import { CronModule } from '../cron';

import { databaseConfig, serviceConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serviceConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mongodb',
          host: config.get('database.host'),
          port: config.get('database.port'),
          database: config.get('database.name'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          authSource: config.get('database.username'),
          entities: [`dist/**/*.model.js`],
          synchronize: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
    }),
    ScheduleModule.forRoot(),
    CronModule,
    DatabaseModule,
    CategoriesModule,
    ManageModule,
    SpecificationsModule,
    DoModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
