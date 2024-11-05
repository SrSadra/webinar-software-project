import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { emailPipe } from '@app/shared/pipes/email.pipe';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('manager')
export class ManagerController {
    @Get("dashboard")
    dashboard(){
        
    }


    @Post("promote/:email")
    async promoteUser(@Param("email" , new emailPipe()) email : string){// this is temporal
        return await this.managerS.promoteUser(email);
    }

    @Post("create-category")
    createCategory(@Body() newCategory: newCategoryDto){
        
    }
}
