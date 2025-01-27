import { Injectable, Logger } from '@nestjs/common';
import { getConfig, PRIVATE_KEY_DEFAULT_BASE64 } from '../../common/config';
import { SignJWT } from 'jose';
import { Perhaps } from '../../common/utils/Perhaps.ts';
import { Repository } from 'typeorm';
import { csvToRoles, User } from '../../common/db/entities/User.entity.ts';
import { InjectRepository } from '@nestjs/typeorm';
import {
  generatePasswordHash,
  JWTPrivateKey,
  JWTPrivatePKCS8,
  type UserToken,
} from '../../common/utils/sandi.ts';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {
    if (
      JWTPrivateKey === PRIVATE_KEY_DEFAULT_BASE64 &&
      getConfig('APP_ENV') !== 'development'
    ) {
      this.logger.warn(
        'APP IS USING DEFAULT JWT KEY WHILE NOT IN DEV MODE!!! Set env var JWT_PRIVATE_KEY_BASE64 and JWT_PUBLIC_KEY_BASE64'
      );
    }
  }

  async localLogin(
    email: string,
    password: string
  ): Promise<Perhaps<string>> {
    const foundUser = await this.findUserByEmail(email);
    if (!foundUser) {
      return Perhaps.OfError(new Error('invalid credentials'));
    }
    if (foundUser.state !== 'active') {
      return Perhaps.OfError(
        new Error('user is inactive. state: ' + foundUser.state)
      );
    }
    const hashedPassword = generatePasswordHash(password);
    const isPasswordMatch = foundUser.password_hash === hashedPassword;
    if (!isPasswordMatch) {
      return Perhaps.OfError(new Error('invalid credentials'));
    }
    const roles = csvToRoles(foundUser.roles);
    const tokenBody: UserToken = {
      id: foundUser.id,
      email: foundUser.email,
      roles,
    };
    const alg = getConfig('JWT_ALGORITHM');
    const token = await new SignJWT(tokenBody)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(getConfig('JWT_EXPIRES_IN'))
      .sign(JWTPrivatePKCS8);
    return Perhaps.Of(token);
  }

  async findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  // async registerUser(user: { email: string; password: string; }) {
  //   const newUser = this.userRepo.create(user);
  // }

  async googleLogin(user?: { email: string; }) {
    if (!user) {
      return Perhaps.OfError(new Error('Unauthenticated!'));
    }

    const userExist = await this.findUserByEmail(user.email);

    if (!userExist) {
      return;
    }

  }

  async linkedInLogin() { }
}
