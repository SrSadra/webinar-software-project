import { RabbitmqService } from "@app/shared";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { CategoryModule } from "./category.module";





async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'category_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
  console.log('Microservice 2 is listening to microservice2_queue');
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(CategoryModule);

//   // const sharedSer = app.get(SharedService); // in main we use this structure to get services


  
//   app.connectMicroservice<MicroserviceOptions>(
//     {transport: Transport.RMQ,
//     options: {
//       urls: ['amqp://localhost:5672'],
//       queue: 'category_queue',
//       queueOptions: {
//         durable: true,
//       },
//     },
//   });
//   await app.startAllMicroservices();

//   await app.listen(3001); // this is hybrid microservice so it recieves http req and also have connection with other micros
//   console.log("microservoce running port 3001");
// }
// bootstrap();