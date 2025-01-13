import { Module } from '@nestjs/common';
import { Identity } from '../../common/db/entities/Identity.entity.ts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityService } from './identity.service.ts';

@Module({
    imports: [TypeOrmModule.forFeature([Identity])],
    providers: [IdentityService],
    exports: [IdentityService],
})
export class IdentityModule {}
