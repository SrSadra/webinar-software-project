import { WebinarCategory } from "@app/shared/entities/webinarCategory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class categoryRepository extends BaseAbstractRepository<WebinarCategory> {
    constructor(@InjectRepository(WebinarCategory) private readonly categoryRep : Repository<WebinarCategory>){
        super(categoryRep);
    }

    async findCategoryByTitle(title: string){
        return await this.categoryRep.findOne({where : {title}});
    }
}