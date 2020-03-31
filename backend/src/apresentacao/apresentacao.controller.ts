import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('slidemaker/api')
export class ApresentacaoController {

    @Get('apresentacao')
    @UseGuards(AuthGuard('jwt'))
    testerequest() { 
        console.log('alow')
    }

}
