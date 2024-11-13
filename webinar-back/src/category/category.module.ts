import { WebinarCategory } from '@app/shared/entities/webinarCategory.entity';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports : [TypeOrmModule.forFeature([WebinarCategory])],
  controllers: [CategoryController],
  providers: [CategoryService,categoryRepository]
})
export class CategoryModule {}
