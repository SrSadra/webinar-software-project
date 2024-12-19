import { EpisodeEntity } from "@app/shared/entities/episode.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";

export class episodeRepository extends BaseAbstractRepository<EpisodeEntity> {
    constructor(@InjectRepository(EpisodeEntity) private readonly episodeRep: Repository<EpisodeEntity>){
        super(episodeRep);
    }

    public async findByTitle(title: string) : Promise<EpisodeEntity>{
        return await this.episodeRep.findOneBy({title});
    }
}