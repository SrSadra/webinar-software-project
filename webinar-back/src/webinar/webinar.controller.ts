import { Role } from '@app/shared/decorators/roles.decorator';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { newTeacherDto } from '@app/shared/dtos/newTeacher.dto';
import { newWebinarDto } from '@app/shared/dtos/newWebinar.dto';
import { updateWebinarDto } from '@app/shared/dtos/updateWebinar.dto';
import { Roles } from '@app/shared/enums/roles.enum';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { WebinarService } from './webinar.service';

@UseGuards(jwtGuard)
@Controller('webinar')
export class WebinarController {
    constructor(private readonly webinarSer : WebinarService){}

    @Role(Roles.MANAGER)
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('imagefile'))
    @Post("create")
    async createWebinar(@Body() newWebinar: newWebinarDto,@UploadedFile() imagefile: MulterFile, @Req() req: Request){
        await this.webinarSer.createWebinar(newWebinar, imagefile, req);
    }

    @Role(Roles.MANAGER)
    @UseGuards(RolesGuard)
    @Put(":id/teacher")
    async addTeacher(@Body() teacher: newTeacherDto, @Param("id") id : number){
        return await this.webinarSer.addTeacher(teacher, id);
    }

    @Role(Roles.MANAGER)
    @UseGuards(RolesGuard)
    @Post(":id/add-episode")
    async addEpisode(@Body() newEpisode: newEpisodeDto,@Param("id") webinarId: number){
        return  await this.webinarSer.addEpisode(newEpisode,webinarId);
    }

    @Put(":id/edit")
    async editWebinar(@Body() webinar: updateWebinarDto,@Param("id") id : number){
        return await this.webinarSer.updateWebinar(webinar,id);
    }


}
