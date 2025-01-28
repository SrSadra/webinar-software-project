import { TransactionEntity } from '@app/shared/entities/transaction.entity';
import { transactionRepository } from '@app/shared/interfaces/repos/transaction.repository';
import { RabbitmqModule } from '@app/shared/rabbitmq.module';
import { jwtAuthModule } from '@app/shared/strategies/jwtauth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        RabbitmqModule.registerRmq("WEBINAR_SERVICE", "webinar_queue"),
        RabbitmqModule.registerRmq("USER_SERVICE", "user_queue"),
        jwtAuthModule,
        JwtModule.registerAsync({
          imports : [ConfigModule],
          useFactory: (configSer : ConfigService) => ({
              secret: configSer.get("JWT_SECRET_PURCHASE"),
              global: true,
              signOptions: {expiresIn: '6000s'}
          }),
          inject : [ConfigService]
        }),
        TypeOrmModule.forFeature([TransactionEntity])
    ],
  controllers: [ServiceController],
  providers: [PaymentService, transactionRepository]
})
export class PaymentModule {}
