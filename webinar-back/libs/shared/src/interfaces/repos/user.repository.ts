import { userEntity } from "@app/shared/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

@Injectable()
export class userRepository extends BaseAbstractRepository<userEntity> {
    constructor(@InjectRepository(userEntity) private user : Repository<userEntity>){
        super(user);
    }

    public async findOneByEmail(email: any): Promise<userEntity> {
        return await this.user.findOne({where : {email}});
    }

    public async findOneByUsername(username: any): Promise<userEntity> {
        return await this.user.findOne({where : {username}});
    }
}