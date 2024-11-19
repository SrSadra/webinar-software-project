import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { WebinarCategory } from '@app/shared/entities/webinarCategory.entity';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { subCategoryRepository } from '@app/shared/interfaces/repos/subcategory.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports : [TypeOrmModule.forFeature([WebinarCategory,SubCategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService,categoryRepository,subCategoryRepository]
})
export class CategoryModule {}
