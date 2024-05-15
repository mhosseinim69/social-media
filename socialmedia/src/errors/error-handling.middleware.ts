import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.on('error', (err) => {
            console.error('An error occurred:', err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });

        next();
    }
}