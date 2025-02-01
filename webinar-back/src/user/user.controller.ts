import { changePassDto } from '@app/shared/dtos/change-pass.dto';
import { userEntity } from '@app/shared/entities/user.entity';
import { jwtGuard } from '@app/shared/guards/jwt.guard';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { UserRequest } from '@app/shared/interfaces/user-request.interface';
import { Body, Controller, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserService } from './user.service';


@Controller('user/setting')
export class UserController {
    constructor(private readonly userSer: UserService){}

    // @UseGuards(jwtGuard)
    // @Put("change-password")
    // async changePass(@Body() passDto: changePassDto, @Req() req: UserRequest){
    //     return await this.userSer.changePass(req.user.username,passDto.oldPass,passDto.newPass);
    // }

    @Post("upload-document")
    @UseInterceptors(FilesInterceptor("userDocument", 3)) // userFiles name shoud match with html name attr // how to make it globally
    async uploadDocment(@Body() titles : string[], @UploadedFiles() files : MulterFile[], @Req() req : UserRequest){
        await this.userSer.uploadUserDocument(titles, files,req.user.username);
    }

    @UseGuards(jwtGuard)
    @Post("certificate")
    async sendDoctorCertificate(@Body("medicalNumber") medicalNumber: number, @Req() req: UserRequest){
        // await this.userSer.validateMedicalNumber(medicalNumber);
        return true;
    }


    @MessagePattern({cmd: "get-profile"})
    async getProfileByUsername(@Ctx() context: RmqContext,@Payload() payload: {username: string}){
        return await this.userSer.getProfileByUsername(payload.username);
    }
}
