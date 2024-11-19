import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { Roles } from '@app/shared/enums/roles.enum';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ManagerService {
    constructor(private readonly userRep : userRepository,private readonly managerRep : managerRepository ,private readonly categoryRep: categoryRepository ){}

    async promoteUser(useremail : string){ // this is temporaly
        const user = await this.userRep.findOneByEmail(useremail);
        if (!user){
            throw new ForbiddenException("user doesnt exist");
        }
        if (user.role == Roles.MANAGER){
            throw new ForbiddenException("user is already manager!");
        }
        const {username,email,phoneNumber,firstname,lastname,persianN,password} = user;
        const newManager: ManagerEntity = this.managerRep.create({
            username,email,phoneNumber,firstname,lastname,persianN,password,webinars:[]
        })
        await this.managerRep.save(newManager);
        await this.userRep.remove(user);

    }


    updateCategory(){
        
    }

    async deactiveCategory(categoryTitle: string){
        return await this.categoryRep.categoryActivate(categoryTitle, false);
    }

}
