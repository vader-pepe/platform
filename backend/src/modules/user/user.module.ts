import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/db/entities/User.entity.ts';
import { IdentityModule } from '../identity/identity.module.ts';
import { UserController } from './user.controller.ts';
import { UserService } from './user.service.ts';

@Module({
    imports: [TypeOrmModule.forFeature([User]), IdentityModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
