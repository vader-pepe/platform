import { Body, Controller, Get, HttpException, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './auth.validations.ts';
import { AuthService } from './auth.service.ts';
import type { Response } from 'express';
import { GoogleOauthGuard } from './strategies/google.strategy.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary:
      'Login with email and password. Returns set-cookie JWT token with user info (id, email, roles).',
  })
  @ApiBody({ type: LoginDto })
  async localLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const perhapsToken = await this.authService.localLogin(
      loginDto.email,
      loginDto.password
    );
    if (perhapsToken.hasError()) {
      throw new HttpException(perhapsToken.getError().message, 403);
    }
    const token = perhapsToken.get();
    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      path: '/',
    });
    return { token };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({
    summary: 'Login with google.'
  })
  async auth() {

  }
}
