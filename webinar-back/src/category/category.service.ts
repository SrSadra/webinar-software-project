import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { updateCategoryDto } from '@app/shared/dtos/updateCategory.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { WebinarCategory } from '@app/shared/entities/webinarCategory.entity';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRep : categoryRepository){}

    async updateCategory(id: number, dto: updateCategoryDto): Promise<WebinarCategory> {
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
          category.subCategory.push(...dto.subCategoriesToAdd);
        }
    
        // Remove subcategories if IDs are provided
        if (dto.subCategoriesToRemove) {
            const subToremove = dto.subCategoriesToRemove;
            let tmp = category.subCategory.filter((el) =>{
                if (!subToremove.includes(el)){
                    return el;
                }
            })
            category.subCategory = tmp;
        }
    
        return await this.categoryRep.save(category);
    }

    async createCategory(newCategory : newCategoryDto){
        const existed = await this.categoryRep.findCategoryByTitle(newCategory.title);
        if (existed){
            throw new ConflictException("Category already exist!");
        }
        return this.categoryRep.create(newCategory);
    }
}
