import { ManagerEntity } from "@app/shared/entities/manager.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

@Injectable()
export class managerRepository extends BaseAbstractRepository<ManagerEntity> {
    constructor(@InjectRepository(ManagerEntity) private managerRep : Repository<ManagerEntity>){
        super(managerRep);
    }

    public async findOneByEmail(email: any): Promise<ManagerEntity> {
        return await this.managerRep.findOne({where: {email}});
    }
}