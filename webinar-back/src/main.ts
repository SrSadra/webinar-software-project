import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// async function bootstrap() {
//   console.log("zendeii");
//   const app = await NestFactory.create(AppModule);
//   app.use(cookieParser());
//   app.useGlobalPipes(new ValidationPipe({
//     transform: true, // Automatically transform payloads to match DTO types
//     // whitelist: true, // Strip unknown properties
//   }))
  
//   await app.listen(10000);
// }
// bootstrap();

async function bootstrap() {
  // Create the main application (Gateway/API)
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
      transform: true, // Automatically transform payloads to match DTO types
      // whitelist: true, // Strip unknown properties
  }))

  // // Attach Microservice 1 using RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'], // RabbitMQ server URL
  //     queue: 'category_queue',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // // Attach Microservice 2 using RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'user_queue',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

    // // Attach Microservice 2 using RabbitMQ
    // app.connectMicroservice<MicroserviceOptions>({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://localhost:5672'],
    //     queue: 'episode_queue',
    //     queueOptions: {
    //       durable: true,
    //     },
    //   },
    // });

  // Start all attached microservices
  await app.startAllMicroservices();

  // app.enableCors({
  //   origin: "http://localhost:5173",
  //   credentials: true
  // })

  // Start the gateway/API server
  await app.listen(10000);
  console.log('Application is running on http://localhost:10000');
}
bootstrap();


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // API Gateway listening on port 3000
//   await app.listen(10000);
//   console.log('API Gateway is running on http://localhost:3000');
// }
// bootstrap();


