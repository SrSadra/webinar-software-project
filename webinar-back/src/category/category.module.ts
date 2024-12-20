import { SharedModule } from '@app/shared';
import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { WebinarCategoryEntity } from '@app/shared/entities/webinarCategory.entity';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { subCategoryRepository } from '@app/shared/interfaces/repos/subcategory.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { jwtStrategy } from '@app/shared/strategies/jwt.strategy';
import { jwtAuthModule } from '@app/shared/strategies/jwtauth.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports : [
    SharedModule,
    TypeOrmModule.forFeature([
      SubCategoryEntity,
      WebinarCategoryEntity
    ]),
    jwtAuthModule,SharedModule.registerRmq("CATEGORY_SERVICE", "category_queue")],
  controllers: [CategoryController],
  providers: [CategoryService,
    // categoryRepository,
    {
      provide: "CATEGORY_REPOSITORY",
      useClass: categoryRepository
    },
    {
      provide: "SUBCATEGORY_REPOSITORY",
      useClass: subCategoryRepository
    },
    // subCategoryRepository
  ]
})
export class CategoryModule {}
