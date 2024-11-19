import { SubCategoryEntity } from "@app/shared/entities/subCategory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class subCategoryRepository extends BaseAbstractRepository<SubCategoryEntity> {
    constructor(@InjectRepository(SubCategoryEntity) subCategoryRep : Repository<SubCategoryEntity>){
        super(subCategoryRep);
    }
}