import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { Roles } from '@app/shared/enums/roles.enum';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
    constructor(private readonly userRep : userRepository, private readonly categoryRep: categoryRepository ){}

    async promoteUser(email : string){ // this is temporaly
        const user = await this.userRep.findOneByEmail(email);
        if (!user){
            throw new ForbiddenException("user doesnt exist");
        }
        if (user.role == Roles.MANAGER){
            throw new ForbiddenException("user is already admin!");
        }
        // const updatedUser = await this.prisma.user.update({
        //     where : {
        //         email
        //     },
        //     data : {
        //         role : Roles.MANAGER
        //     }
        // })
        // return updatedUser;
    }

    async createCategory(newCategory : newCategoryDto){
        const existed = await this.categoryRep.findCategoryByTitle(newCategory.title);
        if (existed){
            throw new ConflictException("Category already exist!");
        }
        return this.categoryRep.create(newCategory);
    }
}
