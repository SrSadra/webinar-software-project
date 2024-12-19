import { webinarEntity } from "@app/shared/entities/webinar.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class webinarRepository extends BaseAbstractRepository<webinarEntity> {
    constructor(@InjectRepository(webinarEntity) private webinarRep : Repository<webinarEntity>){
        super(webinarRep);
    }

    public async findById(id: number): Promise<webinarEntity>{
        return await this.webinarRep.findOneBy({id});
    }
}