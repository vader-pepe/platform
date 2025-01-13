import { Injectable } from '@nestjs/common';
import { Identity } from '../../common/db/entities/Identity.entity.ts';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class IdentityService {
    constructor(
        @InjectRepository(Identity)
        private readonly identityRepo: Repository<Identity>
    ) {}

    deleteIdentity(id: string) {
        return this.identityRepo.delete({ id });
    }
}
