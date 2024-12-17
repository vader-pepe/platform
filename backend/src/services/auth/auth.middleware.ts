import type {CanActivate} from "@nestjs/common";

export class AuthMiddleware implements CanActivate {
    canActivate() {
        return true;
    }
}