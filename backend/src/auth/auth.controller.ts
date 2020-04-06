import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private configService: ConfigService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req) {
        const jwt: string = req.user.jwt;

        const urlFrontend = this.configService.get<string>('URL_FRONTEND');
        if (jwt) {
            return `
                <html>
                    <body>
                        <script>
                            window.opener.postMessage('${jwt}', '${urlFrontend}')
                        </script>
                    </body>
                </html>`;
        } else {
            return 'There was a problem signing in...';
        }
    }

    @Get('usuario-logado')
    @UseGuards(AuthGuard('jwt'))
    usuarioEstaLogado() { }

}