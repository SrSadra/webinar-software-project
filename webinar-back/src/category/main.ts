import { SharedService } from "@app/shared";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { CategoryModule } from "./category.module";


// async function bootstrap() {
//     const app = await NestFactory.create(CategoryModule);
  
//     const sharedSer = app.get(SharedService); // in main we use this structure to get services
  
//     const queue = "category_queue";
    
//     app.connectMicroservice<MicroserviceOptions>(sharedSer.getRmqOption(queue));
//     await app.startAllMicroservices();
//     console.log("hastim?????????????????");
//     await app.listen(3001); // this is hybrid microservice so it recieves http req and also have connection with other micros
//   }
//   bootstrap();


async function bootstrap() {
  console.log("hastiiiimmmm?");
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
  console.log("hastiiiimmmm?");
  await app.listen();
  console.log('Microservice 2 is listening to microservice2_queue');
}
bootstrap();