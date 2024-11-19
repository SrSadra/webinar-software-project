import { Role } from '@app/shared/decorators/roles.decorator';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { updateCategoryDto } from '@app/shared/dtos/updateCategory.dto';
import { Roles } from '@app/shared/enums/roles.enum';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';

@UseGuards(jwtGuard, RolesGuard)
@Role(Roles.MANAGER)
@Controller('category')
export class CategoryController {
    constructor(private readonly categorySer: CategoryService) {}

    @Patch('edit/:id')
    async updateCategoryActions(@Param('id') id: number, @Body() dto: updateCategoryDto) {
      return this.categorySer.updateCategory(id, dto);
    }

    @Post("create-category")
    async createCategory(@Body() newCategory: newCategoryDto){
        return await this.categorySer.createCategory(newCategory);
    }

    @Get("categories")
    async searchCategory(@Query("title") title? : string,@Query("isActive") isActive?: boolean){
        return await this.categorySer.searchCategory(title,isActive);
    }
}
