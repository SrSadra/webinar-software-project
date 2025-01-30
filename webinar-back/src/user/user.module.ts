import { SharedModule } from '@app/shared';
import { CertificateEntity } from '@app/shared/entities/certificate.entity';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { certificateRepository } from '@app/shared/interfaces/repos/certificates.repository';
import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { RabbitmqModule } from '@app/shared/rabbitmq.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports : [
        SharedModule,
        // RabbitmqModule.registerRmq("USER_SERVICE", "user_queue"),
        TypeOrmModule.forFeature([userEntity,ProfileEntity,CertificateEntity])
    // , AuthModule
    ],
    controllers : [UserController],
    providers : [UserService,userRepository,profileRepository,certificateRepository]
})
export class UserModule {}
