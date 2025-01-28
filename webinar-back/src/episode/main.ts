import { RabbitmqService } from "@app/shared";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { EpisodeModule } from "./episode.module";



async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EpisodeModule, { // change appmodule?!
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'episode_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  console.log("alooo");
  
  await app.listen();
  console.log('Microservice 3 is listening to microservice1_queue');
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