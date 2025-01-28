import { RabbitmqService } from "@app/shared";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { UserModule } from "./user.module";

// async function bootstrap() {
//     const app = await NestFactory.create(UserModule);
  
//     // const sharedSer = app.get(SharedService); // in main we use this structure to get services
  
//     const queue = "user_queue";
    
//     app.connectMicroservice<MicroserviceOptions>(
//       {transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'user_queue',
//         queueOptions: {
//           durable: true,
//         },
//       },
//     });
//     await app.startAllMicroservices();
  
//     await app.listen(3003); // this is hybrid microservice so it recieves http req and also have connection with other micros
//     console.log("microservoce running port 3003");
//   }
//   bootstrap();


  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, { // change appmodule?!
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
    
    await app.listen();
    console.log('Microservice 1 is listening to microservice1_queue');
  }
  bootstrap();