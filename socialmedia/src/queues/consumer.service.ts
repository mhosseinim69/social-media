import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { MailService } from '../mail/mail.service';
import 'dotenv/config';

@Injectable()
export class ConsumerService implements OnModuleInit {
    private channelWrapper: ChannelWrapper;
    private readonly logger = new Logger(ConsumerService.name);
    constructor(private mailService: MailService) {
        const connection = amqp.connect([process.env.RABBITMQ_URI]);
        this.channelWrapper = connection.createChannel();
    }

    public async onModuleInit() {
        try {
            await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
                await channel.assertQueue('emailQueue', { durable: true });
                await channel.consume('emailQueue', async (message) => {
                    if (message) {
                        const content = JSON.parse(message.content.toString());
                        this.logger.log('Received message:', content);
                        await this.mailService.sendMail(content.to, content.subject, content.message);
                        channel.ack(message);
                    }
                });
            });
            this.logger.log('Consumer service started and listening for messages.');
        } catch (err) {
            this.logger.error('Error starting the consumer:', err);
        }
    }
}