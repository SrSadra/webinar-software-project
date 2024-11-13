import { userEntity } from '@app/shared/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports : [AuthService]
})
export class AuthModule {}
