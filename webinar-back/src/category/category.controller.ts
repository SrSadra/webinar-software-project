import { RabbitmqService } from '@app/shared';
import { Role } from '@app/shared/decorators/roles.decorator';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { updateCategoryDto } from '@app/shared/dtos/updateCategory.dto';
import { Roles } from '@app/shared/enums/roles.enum';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController {
    constructor(private readonly categorySer: CategoryService,
        // private sharedSer: RabbitmqService
        ) {}

    // @UseGuards(jwtGuard, RolesGuard)
    // @Role(Roles.MANAGER)
    @Patch('edit/:id')
    async updateCategoryActions(@Param('id') id: number, @Body() dto: updateCategoryDto) {
      return this.categorySer.updateCategory(id, dto);
    }

    // @UseGuards(jwtGuard, RolesGuard)
    // @Role(Roles.MANAGER)
    @Post("create-category")
    async createCategory(@Body() newCategory: newCategoryDto){
        return await this.categorySer.createCategory(newCategory);
    }

    // @UseGuards(jwtGuard, RolesGuard)
    // @Role(Roles.MANAGER)
    @Get("categories")
    async searchCategory(@Query("title") title? : string,@Query("isActive") isActive?: boolean){
        return await this.categorySer.searchCategory(title,isActive);
    }

    @Get("sidebar-categories")
    async getSideBarCateries(){
        const categories = await this.categorySer.getSideBarCategories();
        return categories;
    }

    @Get("test")
    test(){
        return "heehe";
    }


    @MessagePattern({cmd: "find-category-by-title"})
    async findCategoryBytitle(@Ctx() context : RmqContext,@Payload() payload: {title: string} ){
        // this.sharedSer.ackMessage(context);
        return await this.categorySer.findCategoryBytitle(payload.title);
    }

    @MessagePattern({cmd: "find-all-sub-by-title"})
    async findAllSubBytitle(@Ctx() context : RmqContext,@Payload() payload: {subcategories: string[]} ){
        // this.sharedSer.ackMessage(context);
        return await this.categorySer.findAllSubBytitle(payload.subcategories);
    }
}
