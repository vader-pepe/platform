import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import type { Repository } from 'typeorm';
import { IdentityService } from '../identity/identity.service';
import type { UpdatePasswordUserDto } from './dto/update-user.dto';
import { User, rolesToCSV } from '../../common/db/entities/User.entity';
import { generatePasswordHash } from '../../common/utils/sandi';
import type { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly identityService: IdentityService
  ) { }
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

  async create(dto: CreateUserDto) {
    const foundUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (foundUser) {
      throw new UserAlreadyExist(
        `User with email ${dto.email} already exists`
      );
    }
    const { email, password } = dto;
    const user = new User();
    user.email = email;
    user.password_hash = generatePasswordHash(password);
    user.state = 'active';
    user.identities = Promise.resolve([]);
    user.roles = rolesToCSV(['EVERYONE']);
    const saved = await this.userRepo.save(user);
    return saved.id;
  }

  async findAll() {
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdatePasswordUserDto) {
    const { email, password } = updateUserDto;
    const foundUser = await this.userRepo.findOne({ where: { email } });
    if (!foundUser) {
      throw new UserNotFound(`user of email ${email} not found`);
    }
    foundUser.password_hash = generatePasswordHash(password);
    return this.userRepo.save(foundUser);
  }

  async remove(dto: DeleteUserDto) {
    const foundUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!foundUser) {
      throw new UserNotFound(`user of email ${dto.email} not found`);
    }
    const identities = await foundUser.identities;
    for (const identity of identities) {
      await this.identityService.deleteIdentity(identity.id);
    }
    return this.userRepo.delete({ email: dto.email });
  }
}

export class UserNotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class UserAlreadyExist extends Error {
  constructor(message: string) {
    super(message);
  }
}
