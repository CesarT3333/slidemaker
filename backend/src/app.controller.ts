import { Get, Res, Controller } from '@nestjs/common';

import { Response } from 'express';

@Controller()
export class AppController {

    @Get()
    index(@Res() response: Response) {
        response.sendFile('public/index.html', { root: __dirname });
    }

    @Get('api/teste')
    testerequest() {
        console.log('teste');
        console.log('teste');
    }

}
