import { RmqContext, RmqOptions } from "@nestjs/microservices"

export interface SharedInterface {
    getRmqOption(queue : string): RmqOptions
    ackMessage(context : RmqContext): void
}