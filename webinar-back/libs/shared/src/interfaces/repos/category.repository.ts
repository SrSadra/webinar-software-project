import { WebinarCategory } from "@app/shared/entities/webinarCategory.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";


@Injectable()
export class categoryRepository extends BaseAbstractRepository<WebinarCategory> {
    constructor(@InjectRepository(WebinarCategory) private readonly categoryRep : Repository<WebinarCategory>){
        super(categoryRep);
    }

    async findCategoryByTitle(title: string, isActive? : boolean){
        const query = this.categoryRep.createQueryBuilder("category").where("category.title LIKE :title", {title: `%${title}%`});
        if (isActive !== undefined){
            query.andWhere('category.isActive = :isActive', { isActive });
        }
        return await query.getMany();
    }

    async findCategoryByActivate(isActive: boolean){
        return await this.categoryRep.findBy({isActive});
    }

    async categoryActivate(title: string, isActive: boolean){
        return await this.categoryRep.createQueryBuilder("category").update().set({isActive}).where("title =:title", {title}).execute();
    }
}