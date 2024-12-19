import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { MailService } from '@app/shared/mailsender/mail.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity,ProfileEntity,ManagerEntity]),
    JwtModule.registerAsync({
      // global: true,
      // secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s' },
      imports : [ConfigModule],
      useFactory: (configSer : ConfigService) => ({
          secret: configSer.get("JWT_SECRET"),
          global: true,
          signOptions: {expiresIn: '60000s'}
      }),
      inject : [ConfigService]
    }),
],
  controllers: [AuthController],
  providers: [AuthService,userRepository, profileRepository,managerRepository,MailService],
  exports : [AuthService]
})
export class AuthModule {}
