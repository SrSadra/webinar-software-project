import { CertificateEntity } from "@app/shared/entities/certificate.entity";
import { EpisodeComments } from "@app/shared/entities/episodeComment.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";


@Injectable()
export class CommentRepository extends BaseAbstractRepository<EpisodeComments> {
    constructor(@InjectRepository(EpisodeComments) private readonly commentRep: Repository<EpisodeComments>){
        super(commentRep);
    }

}