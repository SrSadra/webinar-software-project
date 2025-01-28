import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { TransactionEntity } from '@app/shared/entities/transaction.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { WebinarCategoryEntity } from '@app/shared/entities/webinarCategory.entity';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { transactionRepository } from '@app/shared/interfaces/repos/transaction.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ManagerEntity,userEntity,WebinarCategoryEntity,webinarEntity,TransactionEntity
  ])
  ],
  controllers: [ManagerController],
  providers: [ManagerService,userRepository, managerRepository,
    // categoryRepository
    {
      provide: "CATEGORY_REPOSITORY",
      useClass: categoryRepository
    },
    webinarRepository,
    transactionRepository
  ]
})
export class ManagerModule {}
