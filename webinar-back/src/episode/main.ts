import { RabbitmqService } from "@app/shared";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { EpisodeModule } from "./episode.module";
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from "@nestjs/common";



// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(EpisodeModule, { // change appmodule?!
//     transport: Transport.RMQ,
//     options: {
//       urls: ['amqp://localhost:5672'],
//       queue: 'episode_queue',
//       queueOptions: {
//         durable: true,
//       },
//     },
//   });
//   console.log("alooo");
  
//   await app.listen();
//   console.log('Microservice 3 is listening to microservice1_queue');
// }

// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(EpisodeModule);
    
  // // Set global prefix
  // app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
      transform: true, // Automatically transform payloads to match DTO types
      // whitelist: true, // Strip unknown properties
  }))

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
    // origin: "*",
  })

  

  // Start HTTP app
  await app.listen(3004);
  console.log('HTTP server is running on http://localhost:3004/api');

  // Create the microservice
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(EpisodeModule, {
      transport: Transport.RMQ,
      options: {
          urls: ['amqp://localhost:5672'],
          queue: 'episode_queue',
          queueOptions: {
              durable: true,
          },
      },
  });

  // Start Microservice
  await microservice.listen();
  console.log('Microservice is listening to episode_queue');
  }
  bootstrap();


// async function bootstrap() {
//   const app = await NestFactory.create(EpisodeModule);

//   // const sharedSer = app.get(SharedService); // in main we use this structure to get services

  
//   app.connectMicroservice<MicroserviceOptions>(
//     {transport: Transport.RMQ,
//     options: {
//       urls: ['amqp://localhost:5672'],
//       queue: 'episode_queue',
//       queueOptions: {
//         durable: true,
//       },
//     },
//   });
//   await app.startAllMicroservices();

//   await app.listen(3002); // this is hybrid microservice so it recieves http req and also have connection with other micros
//   console.log("microservoce running port 3002");
// }
// bootstrap();