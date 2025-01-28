import { DynamicModule, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '/.env',
      }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {
  static registerRmq = (service : string, queue: string): DynamicModule => { // queue is exacly what in env
      const providers = [
        {
          provide : service,
          useFactory : (configSer : ConfigService) => {

            const user  = configSer.get("RABBITMQ_USER");
            const pass = configSer.get("RABBITMQ_PASS");
            const host = configSer.get("RABBITMQ_HOST");
            console.log(user, pass, host);
            // console.log(configSer.get("POSTGRES_URI"));
            return ClientProxyFactory.create({
              transport : Transport.RMQ,
              options : {
                urls: [`amqp://${user}:${pass}@${host}`],
                queue,
                queueOptions : {
                  durable : true // data wont be lost between restart
                },
              }
            })
          },
          inject : [ConfigService]
        }
      ]
      
      return {
        module: RabbitmqModule,
        providers,
        exports: providers,
      };
  }
}
