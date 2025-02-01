import { Role } from '@app/shared/decorators/roles.decorator';
import { newEpisodeDto } from '@app/shared/dtos/newEpisode.dto';
import { newTeacherDto } from '@app/shared/dtos/newTeacher.dto';
import { newWebinarDto } from '@app/shared/dtos/newWebinar.dto';
import { updateWebinarDto } from '@app/shared/dtos/updateWebinar.dto';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { Roles } from '@app/shared/enums/roles.enum';
import { webinarStatus } from '@app/shared/enums/webinarStatus.enum';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { WebinarService } from './webinar.service';

// @UseGuards(jwtGuard)
@Controller('webinar')
export class WebinarController {
    constructor(private readonly webinarSer : WebinarService){}

    @Get("search-webinar")
    async getWebinars(
        @Query('page') page: string,
        @Query('perPage') perPage: string,
        @Query('status') status?: string,
        @Query('onlyDoctor') onlyDoctor?: boolean,
        @Query('search') title?: string,
        @Query('category') category?: string,
      ) {
        const pageNumber = parseInt(page, 10) || 1;
        const perPageNumber = parseInt(perPage, 10) || 8;
        
        if (pageNumber < 1 || perPageNumber < 1) {
          throw new BadRequestException('Page and perPage must be positive numbers');
        }
    
        return this.webinarSer.searchWebinar(
          pageNumber,
          perPageNumber,
          status,
          onlyDoctor, // Convert string to boolean
          title,
          category,
        );
      }

    @Get("/:title")
    async getWebinar(@Param("title") title: string) {
      return await this.webinarSer.getWebinar(title);
    }

    // @Get()
    // test(){
    //     console.log("adada");
    //     return true;
    // }

    @Get()
    async getCards(@Res() res: Response){
        console.log("kdkd");
        return res.json(await this.webinarSer.getFeaturedProducts());
    }

   
    @UseGuards(jwtGuard, RolesGuard)
    @Role(Roles.MANAGER)
    @UseInterceptors(FileInterceptor('imagefile'))
    @Post("create")
    async createWebinar(@Body() newWebinar: newWebinarDto,@UploadedFile() imagefile: MulterFile, @Req() req: Request){
        return await this.webinarSer.createWebinar(newWebinar, imagefile, req);
    }

    @Role(Roles.MANAGER)
    @UseGuards(jwtGuard, RolesGuard)
    @Put(":id/teacher")
    async addTeacher(@Body() teacher: newTeacherDto, @Param("id") id : number){
        return await this.webinarSer.addTeacher(teacher, id);
    }

    @Role(Roles.MANAGER)
    @UseGuards(jwtGuard, RolesGuard)
    @Post(":id/add-episode")
    async addEpisode(@Body() newEpisode: newEpisodeDto,@Param("id") webinarId: number){
        return  await this.webinarSer.addEpisode(newEpisode,webinarId);
    }

    @UseGuards(jwtGuard)
    @Put(":id/edit")
    async editWebinar(@Body() webinar: updateWebinarDto,@Param("id") id : number){
        return await this.webinarSer.updateWebinar(webinar,id);
    }

    @MessagePattern({cmd: "find-webinar-by-slug"})
    async getWebinarSlug(@Ctx() context: RmqContext,@Payload() payload: {slug: string}){
        console.log(payload);
        
        return await this.webinarSer.getWebinarBySlug(payload.slug);
    }

    @MessagePattern({cmd: "add-participant-webinar"})
    async addParticipantWebinar(@Ctx() context: RmqContext,@Payload() payload: {webinarId: number, profile: ProfileEntity}){
        console.log("payload", payload);
        return await this.webinarSer.addParticipantWebinar(payload.webinarId, payload.profile);
    }







}
