import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { WebinarCategoryEntity } from '@app/shared/entities/webinarCategory.entity';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ManagerEntity,userEntity,WebinarCategoryEntity
  ])
  ],
  controllers: [ManagerController],
  providers: [ManagerService,userRepository, managerRepository,
    // categoryRepository
    {
      provide: "CATEGORY_REPOSITORY",
      useClass: categoryRepository
    },
  ]
})
export class ManagerModule {}
