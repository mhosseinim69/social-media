import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { MailService } from "../mail/mail.service";

@Module({
    providers: [ProducerService, ConsumerService, MailService],
    exports: [ProducerService],
})
export class QueueModule { }