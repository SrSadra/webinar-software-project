import { FilterWebinarDto } from '@app/shared/dtos/filterwebinar.dto';
import { newCategoryDto } from '@app/shared/dtos/newCategory.dto';
import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { Roles } from '@app/shared/enums/roles.enum';
import { categoryRepository } from '@app/shared/interfaces/repos/category.repository';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { transactionRepository } from '@app/shared/interfaces/repos/transaction.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { webinarRepository } from '@app/shared/interfaces/repos/webinar.repository';
import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ManagerService {
    constructor(private readonly userRep : userRepository,private readonly managerRep : managerRepository ,
        // ,private readonly categoryRep: categoryRepository 
        @Inject("CATEGORY_REPOSITORY") private readonly categoryRep: categoryRepository,
        private readonly webinarRep : webinarRepository,
        private readonly transactionRep: transactionRepository,
        // @Inject("USER_SERVICE") private readonly userSer: ClientProxy,
        ){}

    async promoteUser(useremail : string){ // this is temporaly
        const user = await this.userRep.findOneByEmail(useremail);
        if (!user){
            throw new ForbiddenException("user doesnt exist");
        }
        if (!user.role){
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

    async getUsers(username? :string){ // tmp
        let user: userEntity[];
        if (username){
            console.log(username);
            
            user = await this.userRep.findAll({where: {username}, select : ["email", "nationalCode", "username" , "role"]});
        }else{
            console.log("is that correct?");
            
            user = await this.userRep.findAll({select : ["email", "nationalCode", "username" , "role"]});
        }
        if (!user){
            throw new ForbiddenException("user doesnt exist");
        }
        return user;
    }

    async updateUserEmail(email: string, username: string){
        const user = await this.userRep.findByCondition({where: {username}});
        if (!user){
            throw new ForbiddenException("user doesnt exist");
        }
        user.email = email;
        return await this.userRep.save(user);
    }

    async getWebinarReports(filterDto: FilterWebinarDto) {
        const webinarsWithIncome = await this.transactionRep.getFilteredWebinarsWithIncome(filterDto);
        console.log(webinarsWithIncome);
        
        return webinarsWithIncome.map((webinar) => ({
          id: webinar.webinarId,
          persianTitle: webinar.persianTitle,
          englishTitle: webinar.englishTitle,
          totalIncome: webinar.totalIncome,
        }));
      }

    // async deactiveCategory(categoryTitle: string){
    //     return await this.categoryRep.categoryActivate(categoryTitle, false);
    // }

}
