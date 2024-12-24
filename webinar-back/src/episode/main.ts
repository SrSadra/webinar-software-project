import { SharedService } from "@app/shared";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { EpisodeModule } from "./episode.module";



async function bootstrap() {
  // Create the HTTP server
  const app = await NestFactory.create(EpisodeModule);

  // Enable HTTP server to listen on a specific port
  const PORT = 3009;
  await app.listen(PORT);
  console.log(`HTTP server is listening on http://localhost:${PORT}`);

  // Create and start the microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'episode_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('Microservice is listening on RabbitMQ');
}

bootstrap();