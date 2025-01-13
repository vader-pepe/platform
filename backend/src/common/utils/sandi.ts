import { getConfig } from '../config';
import { scryptSync } from 'crypto';
import { importPKCS8, importSPKI } from 'jose';
import type { Role } from '../db/entities/User.entity.ts';

export function generatePasswordHash(password: string): string {
    const hashLength = parseInt(getConfig('PASSWORD_HASHED_LENGTH'));
    const salt = getConfig('PASSWORD_SALT');
    return scryptSync(password, salt, hashLength).toString('hex');
}

export const JWTPrivateKey = Buffer.from(
    getConfig('JWT_PRIVATE_KEY_BASE64'),
    'base64'
).toString('ascii');
export const JWTPublicKey = Buffer.from(
    getConfig('JWT_PUBLIC_KEY_BASE64'),
    'base64'
).toString('ascii');

export const JWTPrivatePKCS8 = await importPKCS8(
    JWTPrivateKey,
    getConfig('JWT_ALGORITHM')
);
export const JWTPublicSPKI = await importSPKI(
    JWTPublicKey,
    getConfig('JWT_ALGORITHM')
);

export type UserToken = {
    id: string;
    email: string;
    roles: Role[];
};

export const SudoUserInfo: UserToken = {
    id: '0',
    email: 'sudo@local',
    roles: ['SUPER_ADMIN'],
};
