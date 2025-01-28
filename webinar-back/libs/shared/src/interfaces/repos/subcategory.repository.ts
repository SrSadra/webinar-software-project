import { SubCategoryEntity } from "@app/shared/entities/subCategory.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

// @Injectable()
export class subCategoryRepository extends BaseAbstractRepository<SubCategoryEntity> {
    constructor(@InjectRepository(SubCategoryEntity) private subCategoryRep : Repository<SubCategoryEntity>){
        super(subCategoryRep);
    }
}