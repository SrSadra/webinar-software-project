import { FilterWebinarDto } from "@app/shared/dtos/filterwebinar.dto";
import { webinarEntity } from "@app/shared/entities/webinar.entity";
import { DateFilter } from "@app/shared/enums/dateFilter.enum";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

@Injectable()
export class webinarRepository extends BaseAbstractRepository<webinarEntity> {
    constructor(@InjectRepository(webinarEntity) private webinarRep : Repository<webinarEntity>){
        super(webinarRep);
    }

    public async findById(id: number): Promise<webinarEntity>{
        return await this.webinarRep.findOneBy({id});
    }

    public createquerybuilder(alisis: string){
        return this.webinarRep.createQueryBuilder(alisis);
    }

    // async findWebinarByIdRelation(id: number, relation? : string){
    //   return await this.webinarRep.findOne({
        
    //   })
    // }

    public async getExactWebinarSafe(slug: string){
        return await this.webinarRep
      .createQueryBuilder('webinar')
      .select([
        'webinar.persianTitle',
        'webinar.englishTitle',
        'webinar.status',
        'webinar.description',
        'webinar.image',
        'webinar.price',
        'webinar.discountPercent',
        'webinar.onlyDoctor',
        'webinar.slug',
      ])
      .where('webinar.slug = :slug', { slug: `${slug}` }).getOne();
    }

    async getWebinarForPurchase(slug: string){
        return await this.webinarRep.findOne({
            where: { slug },
            select: ['englishTitle', 'persianTitle', 'price','image', 'discountPercent', "id" ], 
          });
    }


}