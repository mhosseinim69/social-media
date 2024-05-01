import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class ProducerService {
    private channelWrapper: ChannelWrapper;

    constructor() {
        const connection = amqp.connect(['amqp://localhost']);
        this.channelWrapper = connection.createChannel({
            setup: async (channel: Channel) => {
                await channel.assertQueue('emailQueue', { durable: true });
                return channel;
            },
        });
    }

    async addToEmailQueue(mail: any) {
        try {
            await this.channelWrapper.sendToQueue(
                'emailQueue',
                Buffer.from(JSON.stringify(mail))
            );
            Logger.log('Sent To Queue');
        } catch (error) {
            throw new HttpException(
                'Error adding mail to queue',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}