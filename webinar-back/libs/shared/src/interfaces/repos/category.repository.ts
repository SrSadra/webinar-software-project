import { WebinarCategoryEntity } from "@app/shared/entities/webinarCategory.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";


// @Injectable()
export class categoryRepository extends BaseAbstractRepository<WebinarCategoryEntity> {
    constructor(@InjectRepository(WebinarCategoryEntity) private readonly categoryRep : Repository<WebinarCategoryEntity>){
        super(categoryRep);
    }

    async findCategoriesByTitle(title: string, isActive? : boolean){
        const query = this.categoryRep.createQueryBuilder("category").where("category.title LIKE :title", {title: `%${title}%`});
        if (isActive !== undefined){
            query.andWhere('category.isActive = :isActive', { isActive });
        }
        return await query.getMany();
    }

    async findCategoryByActivate(isActive: boolean){
        return await this.categoryRep.findBy({isActive});
    }

    public async findCategoryBytitle(title: string): Promise<WebinarCategoryEntity | null> {
        let res = await this.categoryRep.createQueryBuilder()
            .where('title =:title', { title })
            .getOne();
        return res;
    }

    async categoryActivate(title: string, isActive: boolean){
        return await this.categoryRep.createQueryBuilder("category").update().set({isActive}).where("title =:title", {title}).execute();
    }
}