import { webinarFilesEntity } from "@app/shared/entities/webinarFiles.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

@Injectable()
export class episodeFileRepository extends BaseAbstractRepository<webinarFilesEntity> {
    constructor(@InjectRepository(webinarFilesEntity) private fileRep : Repository<webinarFilesEntity>){
        super(fileRep);
    }

}