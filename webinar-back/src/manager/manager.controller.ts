import { Role } from '@app/shared/decorators/roles.decorator';
import { FilterWebinarDto } from '@app/shared/dtos/filterwebinar.dto';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { Roles } from '@app/shared/enums/roles.enum';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { emailPipe } from '@app/shared/pipes/email.pipe';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';


// @Role(Roles.MANAGER)
// @UseGuards(jwtGuard,RolesGuard)
@Controller('manager')
export class ManagerController {
    constructor(private readonly managerSer: ManagerService){}


    @Get("dashboard")
    dashboard(){
        
    }



    @Post("promote/:email")
    async promoteUser(@Param("email" , new emailPipe()) email : string){// this is temporal
        return await this.managerSer.promoteUser(email);
    }


    @Put("update-category")
    updateCategory(){

    }

    @Get('webinar-reports')
    async getWebinarReports(@Query() filterDto: FilterWebinarDto) {
        return this.managerSer.getWebinarReports(filterDto);
    }

    @Get("users")
    async getUsers(@Body("username") username? :string){
        return await this.managerSer.getUsers(username);
    }

    @Put("edit-users/:username")
    async editUser(@Param("username") username: string , @Body() email: {email: string}){
        console.log(email);
        return this.managerSer.updateUserEmail(email.email, username);
    }



    // @Put("deactive-category")
    // async deactiveCategory(@Body() title : string){
    //     return await this.managerSer.deactiveCategory(title);
    // }

}
