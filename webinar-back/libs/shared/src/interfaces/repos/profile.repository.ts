import { ProfileEntity } from "@app/shared/entities/profile.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

@Injectable()
export class profileRepository extends BaseAbstractRepository<ProfileEntity> {
    constructor(@InjectRepository(ProfileEntity) private readonly profileRep : Repository<ProfileEntity>){
            super(profileRep);
        }


    async getProfileByUsername(username: string): Promise<ProfileEntity> {
        const profile = await this.profileRep
              .createQueryBuilder('profile')
              .leftJoinAndSelect('profile.user', 'user') 
              .where('user.username = :username', { username })
              .getOne();
        
        return profile;
    }
}