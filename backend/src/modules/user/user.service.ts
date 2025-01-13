import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { rolesToCSV, User } from '../../common/db/entities/User.entity.ts';
import { Repository } from 'typeorm';
import { generatePasswordHash } from '../../common/utils/sandi.ts';
import { IdentityService } from '../identity/identity.service.ts';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly identityService: IdentityService
    ) {}

    async whoami(email: string): Promise<User> {
        const me = await this.userRepo.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                roles: true,
                state: true,
                created_at: true,
                updated_at: true,
            },
        });
        if (!me) {
            throw new UserNotFound(`User with email ${email} not found`);
        }
        return me;
    }

    async listAllUsers() {
        return this.userRepo.find({
            select: {
                id: true,
                email: true,
                roles: true,
                state: true,
                created_at: true,
            },
        });
    }

    async createUser(newUser: {
        email: string;
        password: string;
    }): Promise<string> {
        const { email, password } = newUser;
        const user = new User();
        user.email = email;
        user.password_hash = generatePasswordHash(password);
        user.state = 'active';
        user.identities = Promise.resolve([]);
        user.roles = rolesToCSV(['EVERYONE']);
        const saved = await this.userRepo.save(user);
        return saved.id;
    }

    async deleteUser(email: string) {
        const foundUser = await this.userRepo.findOne({ where: { email } });
        if (!foundUser) {
            throw new UserNotFound(`user of email ${email} not found`);
        }
        const identities = await foundUser.identities;
        for (const identity of identities) {
            await this.identityService.deleteIdentity(identity.id);
        }
        return this.userRepo.delete({ email });
    }

    async updatePassword(email: string, password: string) {
        const foundUser = await this.userRepo.findOne({ where: { email } });
        if (!foundUser) {
            throw new UserNotFound(`user of email ${email} not found`);
        }
        foundUser.password_hash = generatePasswordHash(password);
        return this.userRepo.save(foundUser);
    }
}

export class UserNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}
