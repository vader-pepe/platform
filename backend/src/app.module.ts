import { Logger, Module, type OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateOrmOptions, getConfig } from './common/config';
import { seedDB } from './common/db/seeding.ts';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from './common/middlewares/auth.ts';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { UsersModule } from './modules/users/users.module.ts';
import { AuthModule } from './modules/auth/auth.module.ts';

@Module({
  imports: [
    SentryModule.forRoot(),
    TypeOrmModule.forRootAsync(generateOrmOptions()),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthMiddleware,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);
  async onApplicationBootstrap() {
    if (getConfig('APP_ENV') === 'development') {
      this.logger.log('App is running in development mode');
      await seedDB();
    }
  }
}
