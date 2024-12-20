import { Logger, Module, type OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateOrmOptions, getConfig } from './common/config';
import { seedDB } from './common/db/seeding.ts';
import { AuthModule } from './modules/auth/auth.module.ts';

@Module({
    imports: [TypeOrmModule.forRootAsync(generateOrmOptions()), AuthModule],
    controllers: [],
    providers: [],
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
