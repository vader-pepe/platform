import { Body, Controller, HttpException, Post, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import type { LoginDto } from './auth.validations.ts'
import type { AuthService } from './auth.service.ts'
import type { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({
        summary:
            'Login with email and password. Returns set-cookie JWT token with user info (id, email, roles).',
    })
    async localLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
        const perhapsToken = await this.authService.localLogin(
            loginDto.email,
            loginDto.password
        )
        if (perhapsToken.hasError()) {
            throw new HttpException(perhapsToken.getError(), 403)
        }
        const token = perhapsToken.get()
        res.setHeader(
            'set-cookie',
            `Authorization=Bearer ${token}; HttpOnly; Path=/;`
        )
        res.json({ token })
    }
}
