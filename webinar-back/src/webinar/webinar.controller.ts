import { newWebinarDto } from '@app/shared/dtos/newWebinar.dto';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { Body, Controller, Post, Put, Req, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { WebinarService } from './webinar.service';

@Controller('webinar')
export class WebinarController {
    constructor(private readonly webinarSer : WebinarService){}

    @Post("create")
    async createWebinar(@Body() newWebinar: newWebinarDto,@UploadedFile() imagefile: MulterFile, @Req() req: Request){
        await this.webinarSer.createWebinar(newWebinar, imagefile, req);
    }
}
