import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { WebinarModule } from "./webinar.module";

  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(WebinarModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'webinar_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
    
    await app.listen();
    console.log('Microservice 4 is listening to microservice1_queue');
  }
  bootstrap();

  // async function bootstrap() {
  //   const app = await NestFactory.create(WebinarModule);
  
  //   // const sharedSer = app.get(SharedService); // in main we use this structure to get services
  
  //   const queue = "webinar_queue";
    
  //   app.connectMicroservice<MicroserviceOptions>(
  //     {transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'webinar_queue',
  //       queueOptions: {
  //         durable: true,
  //       },
  //     },
  //   });
  //   await app.startAllMicroservices();
  
  //   await app.listen(3004); // this is hybrid microservice so it recieves http req and also have connection with other micros
  //   console.log("microservoce running port 3004");
    
  // }
  // bootstrap();