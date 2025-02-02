import { RabbitmqService } from '@app/shared';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { webinarEntity } from '@app/shared/entities/webinar.entity';
import { MultipleFilesInterceptor } from '@app/shared/interceptors/file.interceptor';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { UserRequest } from '@app/shared/interfaces/user-request.interface';
import { Body, Controller, Get, Inject, Param, Post, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v2 as Cloudinary } from 'cloudinary';
import { Request } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { EpisodeService } from './episode.service';

@Controller('webinar/:slug') // ? 
export class EpisodeController {
    constructor(private episodeSer: EpisodeService, private sharedSer: RabbitmqService,
        // @Inject("cloudinary") private cloudinaryConf: typeof Cloudinary
        ){}

    @Post("addfile")
    @UseInterceptors(FilesInterceptor("episodeFiles", 10)) // episodeFiles name shoud match with html name attr // how to make it globally
    async addFiles(@Query("title") episodeTitle: string,@UploadedFiles() files : MulterFile[]){ //multiple files
        return await this.episodeSer.uploadEpisodeFiles(files, episodeTitle);
    }

    
    @Get("episode/:id/files")
    async getEpisodeFiles(@Param("id") episodeId: number){
        return await this.episodeSer.getEpisodeFiles(episodeId)
    }

    @Post("episode/:id/comments")
    async addComment(@Req() req: UserRequest, @Body("comment") comment : string, @Param("id") episodeId: number){
        return await this.episodeSer.addComment(comment, req.user, episodeId);
    }

    @Get("episode/:id/comments")
    async getEpisodeComment(@Param("id") episodeId: number){
        return await this.episodeSer.getEpisodeComments(episodeId);
    }

    @MessagePattern({cmd: "create-episode"})
    async createEpisode(@Ctx() context : RmqContext,@Payload() payload: {newEpisode:newEpisodeDto ,webinar: webinarEntity}){
        this.sharedSer.ackMessage(context);
        return await this.episodeSer.createEpisode(payload.newEpisode, payload.webinar);
    }


    @EventPattern(undefined)
    tst(@Ctx() context : RmqContext){
        console.log("trouble?");
    }

    @MessagePattern({cmd: "find-webinar-episodes"})
    async getWebinarEpisodes(@Ctx() context: RmqContext, @Payload() payload: {webinar: webinarEntity}){
        console.log("we are here");
        // this.sharedSer.ackMessage(context);
        return await this.episodeSer.getWebinarEpisodes(payload.webinar);
    }

    
    

    

}
