import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import type { AuthorizedRequest } from '../../common/middlewares/auth';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get('me')
  @Roles('EVERYONE')
  @ApiOperation({
    summary: 'Get current authenticated user info',
  })
  async me(@Req() req: AuthorizedRequest) {
    return this.usersService.whoami(req.user.email);
  }

  @Post('create')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Create User',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('all')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'List all User',
  })
  async listAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('password')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Update user password',
  })
  @ApiBody({ type: UpdatePasswordUserDto })
  async updatePassword(@Body() dto: UpdatePasswordUserDto) {
    return this.usersService.update(dto);
  }

  @Delete('delete')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Delete User',
  })
  @ApiBody({ type: DeleteUserDto })
  async deleteUser(@Body() dto: DeleteUserDto) {
    return this.usersService.remove(dto);
  }
}
