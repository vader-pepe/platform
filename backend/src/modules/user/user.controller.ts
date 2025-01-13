import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service.ts';
import { Roles } from '../auth/roles.decorator.ts';
import {
    CreateUserDto,
    DeleteUserDto,
    UpdatePasswordUserDto,
} from './user.validations.ts';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import type { AuthorizedRequest } from '../../common/middlewares/auth.ts';

@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @Roles('EVERYONE')
    @ApiOperation({
        summary: 'Get current authenticated user info',
    })
    async me(@Req() req: AuthorizedRequest) {
        return this.userService.whoami(req.user.email);
    }

    @Get('all')
    @Roles('SUPER_ADMIN')
    @ApiOperation({
        summary: 'List all User',
    })
    async listAllUsers() {
        return this.userService.listAllUsers();
    }

    @Post('create')
    @Roles('SUPER_ADMIN')
    @ApiOperation({
        summary: 'Create User',
    })
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Delete('delete')
    @Roles('SUPER_ADMIN')
    @ApiOperation({
        summary: 'Delete User',
    })
    @ApiBody({ type: DeleteUserDto })
    async deleteUser(@Body() dto: DeleteUserDto) {
        return this.userService.deleteUser(dto.email);
    }

    @Patch('password')
    @Roles('SUPER_ADMIN')
    @ApiOperation({
        summary: 'Update user password',
    })
    @ApiBody({ type: UpdatePasswordUserDto })
    async updatePassword(@Body() dto: UpdatePasswordUserDto) {
        return this.userService.updatePassword(dto.email, dto.password);
    }
}
