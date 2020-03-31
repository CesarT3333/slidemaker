import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class SessionAuthMiddleware implements NestMiddleware {
    constructor() {
    }
    use(req: any, res: any, next: () => void) {
        throw new Error('Method not implemented.');
    }

    async resolve(...args: any[]): Promise<any> {
        return async (req: any, res: Response, next: NextFunction) => {
            if (req.query.socketId) {
                req.session.socketId = req.query.socketId;
            }
            next();
        };

    }
}