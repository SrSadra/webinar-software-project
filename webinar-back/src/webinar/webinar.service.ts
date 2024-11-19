import { CloudinaryService } from '@app/shared/cloudinary/cloudinary.service';
import { newWebinarDto } from '@app/shared/dtos/newWebinar.dto';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { subCategoryRepository } from '@app/shared/interfaces/repos/subcategory.repository';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { In } from 'typeorm';

@Injectable()
export class WebinarService {
    constructor(private readonly cloudinarySer : CloudinaryService,
         private readonly categoryRep : categoryRepository,
         private readonly subCategoryRep : subCategoryRepository,
         private readonly webinarRep : webinarRepository,
         private readonly config : ConfigService){}

    async createWebinar(createDto : newWebinarDto, file : MulterFile, req : Request){
        const manager = req.user;
        if (!manager){
            throw new NotFoundException("Manager is not exist!");
        }

        const {categoryName, subCategoryNames} = createDto;
        const category = await this.categoryRep.findByCondition({where : {title: categoryName}});
        if (!category){
            throw new NotFoundException("Category name not found!");
        }
        const subcategories = await this.subCategoryRep.findAll({where : {
            title: In(subCategoryNames)
        }});
        const invitationLink = this.createWebinarLink();
        const uploadedFile = await this.cloudinarySer.uploadImage(file);
        const webinar = this.webinarRep.create({
            ...createDto,
            category,
            subcategories, 
            invitationLink,
            image: uploadedFile.url,
            creator: manager,
        })
    }

    createWebinarLink(): string{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        const webinarRoute = this.config.get("WEBINAR_ROUTE");
        const link = webinarRoute + result;
        return link;
    }
}   
