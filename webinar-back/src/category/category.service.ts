import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { updateCategoryDto } from '@app/shared/dtos/updateCategory.dto';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WebinarCategoryEntity } from '@app/shared/entities/webinarCategory.entity';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { subCategoryRepository } from '@app/shared/interfaces/repos/subcategory.repository';
import { SubCategoryEntity } from '@app/shared/entities/subCategory.entity';
import { In } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@Inject("CATEGORY_REPOSITORY") private readonly categoryRep : categoryRepository,@Inject("SUBCATEGORY_REPOSITORY") private readonly subCategoryRep: subCategoryRepository ,){}

    async updateCategory(id: number, dto: updateCategoryDto): Promise<WebinarCategoryEntity> {
        const category = await this.categoryRep.findByCondition({
          where: { id },
          relations: ['subCategory'],
        });
        if (!category) throw new NotFoundException('Category not found');
    
        // Update the activation status if provided
        if (dto.isActive !== undefined) {
          category.isActive = dto.isActive;
        }
    
        // Add subcategories if titles are provided
        if (dto.subCategoriesToAdd) {
            const subCats = dto.subCategoriesToAdd;
            subCats.forEach(async (title: string) => {
                const subCategory = this.subCategoryRep.create({title,category});
                await this.subCategoryRep.save(subCategory);
            })
            // category.subCategory.push(...dto.subCategoriesToAdd);
        }
    
        // Remove subcategories if IDs are provided
        if (dto.subCategoriesToRemove) {
            const subToremove = dto.subCategoriesToRemove;
            // let tmp = category.subCategory.filter((el) =>{
            //     if (!subToremove.includes(el)){
            //         return el;
            //     }
            // })
            const subCategories: SubCategoryEntity[] = await this.subCategoryRep.findAll({where:{category}});
            subCategories.forEach(async (el) => {
                if (subToremove.includes[el.title]){
                    await this.subCategoryRep.remove(el);
                }
            });
        }
    
        return await this.categoryRep.save(category);
    }

    async createCategory(newCategory : newCategoryDto){
        const {subCategory, title} = newCategory
        console.log("existed");
        const existed = await this.categoryRep.findByCondition({
            where : {title}
        });
        console.log("existed");
        if (existed){
            throw new ConflictException("Category already exist!");
        }
        const category = this.categoryRep.create({
            title,
            webinar : []
        });
        if (subCategory){
            subCategory.forEach(async (el) => {
                const newSubCat = this.subCategoryRep.create({title: el, category : category});
                await this.subCategoryRep.save(newSubCat);
            })
        }
        return this.categoryRep.save(category);
    }

    async searchCategory(title?: string, isActive? : boolean){
        if (title){
            return await this.categoryRep.findCategoriesByTitle(title, isActive);
        }
        else if (isActive){
            return await this.categoryRep.findCategoryByActivate(isActive);
        }
        else{
            throw new NotFoundException("No webinar has found!");
        }
    }

    async findCategoryBytitle(title: string){
        return await this.categoryRep.findCategoriesByTitle(title);
    }

    async findAllSubBytitle(subCategories : string[]){
        return await this.subCategoryRep.findAll({where : {
            title: In(subCategories)
        }});
    }
}
