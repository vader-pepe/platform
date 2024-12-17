import {Injectable} from "@nestjs/common";
import {DbClient} from "../../common/db/DbClient.ts";
import type {Role, User, UserRole} from "../../common/db/schemas.ts";
import {getConfig} from "../../common/config";
import {scryptSync} from "crypto";
import {SignJWT} from "jose";
import {Perhaps} from "../../common/utils/Perhaps.ts";

@Injectable()
export class AuthService {
    async login(params: LoginParams) {
        const Users = () => DbClient.querierInstance<User>("users");
        const UserRoles = () => DbClient.querierInstance<UserRole>("user_roles");

        const user = await Users().select("*").where({ email: params.email }).first();
        if (!user) {
            return Perhaps.OfError(new Error("invalid credentials"));
        }
        const hashLength = parseInt(getConfig('PASSWORD_HASHED_LENGTH'));
        const salt = getConfig('PASSWORD_SALT');
        const hashedPassword = scryptSync(params.password, salt, hashLength).toString('hex');
        const isPasswordMatch = user.password_hash === hashedPassword;
        if (!isPasswordMatch) {
            return Perhaps.OfError(new Error("invalid credentials"));
        }
        const roles: Role[] = await UserRoles().join('roles', 'user_roles.role_id', 'roles.id')
            .where('user_roles.user_id', user.id)
            .select('roles.*');
        const tokenBody: UserToken = {
            userID: user.id,
            email: user.email,
            roles: roles.map(role => role.name)
        }
        const jwtSecret = getConfig('JWT_SECRET');
        const token = await new SignJWT(tokenBody).sign(Buffer.from(jwtSecret, 'utf8'));
        return { token };
    }
}

interface LoginParams {
    email: string;
    password: string;
}

type UserToken = {
    userID: string;
    email: string;
    roles: string[];
};