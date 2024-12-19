import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.ts';
import { AuthService } from './auth.service.ts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/db/entities/User.entity.ts';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
