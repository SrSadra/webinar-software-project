import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { SharedInterface } from './interfaces/shared.interface';

@Injectable()
export class RabbitmqService implements SharedInterface{
    constructor(private readonly configSer : ConfigService){}

    getRmqOption(queue : string): RmqOptions {
        const user  = this.configSer.get("RABBITMQ_USER");
        const pass = this.configSer.get("RABBITMQ_PASS");
        const host = this.configSer.get("RABBITMQ_HOST");
        return {
            transport : Transport.RMQ,
            options : {
            noAck : false,
            urls : [`amqp://${user}:${pass}@${host}`],
            queue,
            queueOptions : {
                durable : true // data wont be lost between restart
                }
            },
        }
    }


    ackMessage(context : RmqContext){
        const channel = context.getChannelRef();
        const message = context.getMessage(); // what is exactly channel?!
        
        channel.ack(message); //anknowledge the message
    }
}
