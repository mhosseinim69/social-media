import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: 'Resource not found',
            data: null, // You can include additional data in the response if needed
        });
    }
}