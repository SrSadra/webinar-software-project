import { webinarEntity } from "@app/shared/entities/webinar.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class webinarRepository extends BaseAbstractRepository<webinarEntity> {
    constructor(@InjectRepository(webinarEntity) webinarRep : Repository<webinarEntity>){
        super(webinarRep);
    }
}