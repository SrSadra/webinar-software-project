import { Module } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { WebinarController } from './webinar.controller';
import { CloudinaryModule } from '@app/shared/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { WebinarCategory } from '@app/shared/entities/webinarCategory.entity';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { subCategoryRepository } from '@app/shared/interfaces/repos/subcategory.repository';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';

@Module({
  imports: [CloudinaryModule,TypeOrmModule.forFeature([webinarEntity,SubCategoryEntity, WebinarCategory])],
  providers: [WebinarService,categoryRepository,subCategoryRepository,webinarRepository],
  controllers: [WebinarController]
})
export class WebinarModule {}
