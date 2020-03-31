import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req) {
        const jwt: string = req.user.jwt;
        if (jwt) {
            return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:3000')</script></body></html>`;
        } else {
            return 'There was a problem signing in...';
        }
    }

}