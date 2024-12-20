import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOption } from '@app/shared/db/data-source';
import { WebinarModule } from './webinar/webinar.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EpisodeModule } from './episode/episode.module';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    AuthModule, ManagerModule,
    // ConfigModule.forRoot({
    //   isGlobal : true,
    // }),
    SharedModule,
    // JwtModule.registerAsync({
    //   imports : [ConfigModule],
    //   useFactory: (configSer : ConfigService) => ({
    //     global: true,
    //     secret : configSer.get("JWT_SECRET"),
    //   }),
    //   inject : [ConfigService]
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports : [ConfigModule],
    //   useFactory : () => ({
    //     ...dataSourceOption,
    //     autoLoadEntities : true,
    //     synchronize: true
    //   })
    // }),
    WebinarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
