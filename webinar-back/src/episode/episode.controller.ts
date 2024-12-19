import { SharedService } from '@app/shared';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { MultipleFilesInterceptor } from '@app/shared/interceptors/file.interceptor';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { Controller, Inject, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v2 as Cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { EpisodeService } from './episode.service';

@Controller('webinar/:id') // ? 
export class EpisodeController {
    constructor(private episodeSer: EpisodeService, private sharedSer: SharedService,@Inject("cloudinary") private cloudinaryConf: typeof Cloudinary){}

    @Post("addfile")
    @UseInterceptors(FilesInterceptor("episodeFiles", 10)) // episodeFiles name shoud match with html name attr // how to make it globally
    // @UseInterceptors(FilesInterceptor("episodeFiles", 10))
    async addFiles(@Query("title") episodeTitle: string,@UploadedFile() files : MulterFile[]){ //multiple files
        return await this.episodeSer.uploadEpisodeFiles(files, episodeTitle);
    }

    @MessagePattern({cmd: "create-episode"})
    createEpisode(@Ctx() context : RmqContext, payload: newEpisodeDto & {webinar: webinarEntity}){
        this.sharedSer.ackMessage(context);
        this.episodeSer.createEpisode(payload, payload.webinar);
    }

    

}
