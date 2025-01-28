import { DynamicModule, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './db/data-source';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '/.env',
    // }),
    // CloudinaryModule,
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : () => ({
        ...dataSourceOption,
        autoLoadEntities : true,
        synchronize: true
      })
    }),
    ConfigModule.forRoot({
      isGlobal : true,
    }),
  ],
  providers: [CloudinaryService,CloudinaryProvider],
  exports: [CloudinaryService,CloudinaryProvider],
})
export class SharedModule {}
