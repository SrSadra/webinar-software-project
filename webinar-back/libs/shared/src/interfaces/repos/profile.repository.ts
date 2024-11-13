import { ProfileEntity } from "@app/shared/entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class profileRepository extends BaseAbstractRepository<ProfileEntity> {
    constructor(@InjectRepository(ProfileEntity) private readonly profileRep : Repository<ProfileEntity>){
            super(profileRep);
        }
}