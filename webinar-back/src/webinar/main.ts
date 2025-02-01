import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { WebinarModule } from "./webinar.module";

  // async function bootstrap() {
  //   const app = await NestFactory.createMicroservice<MicroserviceOptions>(WebinarModule, {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'webinar_queue',
  //       queueOptions: {
  //         durable: true,
  //       },
  //     },
  //   });
    
  //   // app.se

  //   await app.listen();
  //   console.log('Microservice 4 is listening to microservice1_queue');
  // }
  // bootstrap();


  async function bootstrap() {
  const app = await NestFactory.create(WebinarModule);
    
  // // Set global prefix
  // app.setGlobalPrefix('api');

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
    // allowedHeaders: "Content-Type, Authorization", // Allowed headers
    // origin: "*",
  })

  // Start HTTP app
  await app.listen(3001);
  console.log('HTTP server is running on http://localhost:3001/api');

  // Create the microservice
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(WebinarModule, {
      transport: Transport.RMQ,
      options: {
          urls: ['amqp://localhost:5672'],
          queue: 'webinar_queue',
          queueOptions: {
              durable: true,
          },
      },
  });

  // Start Microservice
  await microservice.listen();
  console.log('Microservice is listening to webinar_queue');
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