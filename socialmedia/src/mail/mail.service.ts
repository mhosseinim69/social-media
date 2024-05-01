import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) { }

    async sendMail(to: string, subject: string, message: string): Promise<void> {

        await this.mailService.sendMail({
            from: 'Socialmedia@gmail.com',
            to,
            subject,
            text: message,
        });
    }
}