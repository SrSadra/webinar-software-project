import { SharedService } from '@app/shared';
import { CloudinaryService } from '@app/shared/cloudinary/cloudinary.service';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { episodeRepository } from '@app/shared/interfaces/repos/episode.repository';
import { episodeFileRepository } from '@app/shared/interfaces/repos/episodeFile.repository';
import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class EpisodeService {
    constructor(private readonly episodeRep : episodeRepository,private readonly episodeFileRep:  episodeFileRepository,private cloudinarySer: CloudinaryService) {}

    async uploadEpisodeFiles(files: MulterFile[], episode: string){
        const foundedEpisode = await this.episodeRep.findByTitle(episode);
        if (!foundedEpisode){
            throw new NotFoundException("Episode not found!");
        }
        const filesUrl = await this.cloudinarySer.uploadFiles(files,`${foundedEpisode.webinar}/${foundedEpisode.id}`);
        const createdFiles = filesUrl.map((url) => 
            this.episodeFileRep.create({
                filePath: url,
                webinarEpisode: foundedEpisode
            })
        );
        await this.episodeFileRep.saveMany(createdFiles);
    }

    async createEpisode(newEpisode: newEpisodeDto, webinar: webinarEntity){//add video?
        try{
            const {title, startTime,endTime} = newEpisode;
            // const $ob = 
            const foundedEpisode = await this.episodeRep.findByCondition({where: {title, webinar}});
            if (!foundedEpisode){
                const otherEpisodes = await this.episodeRep.findAll({where: {webinar}});
                otherEpisodes.forEach((el) => {
                    if ((startTime < el.startTime && endTime > el.startTime) || (startTime > el.startTime && endTime > el.startTime)){
                        throw new HttpException(`This episode conflicts with episode ${el.title}!`, HttpStatus.CONFLICT);
                    }
                });
                const episode = this.episodeRep.create({...newEpisode,webinar});
                return await this.episodeRep.save(episode);
            }
            else{
                throw new HttpException('This episode already exist!', HttpStatus.CONFLICT);
            }
        }catch(err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }

    }
}
