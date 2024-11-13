import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOption } from '@app/shared/db/data-source';
import { WebinarModule } from './webinar/webinar.module';

@Module({
  imports: [
    AuthModule, ManagerModule, UserModule, CategoryModule,
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : () => ({
        ...dataSourceOption,
        autoLoadEntities : true
      })
    }),
    WebinarModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
