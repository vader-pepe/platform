import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/db/entities/User.entity.ts';
import { IdentityModule } from '../identity/identity.module.ts';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IdentityModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
