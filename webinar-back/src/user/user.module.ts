import { userEntity } from '@app/shared/entities/user.entity';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports : [TypeOrmModule.forFeature([userEntity]), AuthModule],
    controllers : [UserController],
    providers : [UserService,userRepository]
})
export class UserModule {}
