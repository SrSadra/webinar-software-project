import { changePassDto } from '@app/shared/dtos/change-pass.dto';
import { UserRequest } from '@app/shared/interfaces/user-request.interface';
import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';


@Controller('user/setting')
export class UserController {
    constructor(private readonly userSer: UserService){}

    // @UseGuards(jwtGuard)
    @Put("change-password")
    async changePass(@Body() passDto: changePassDto, @Req() req: UserRequest){
        return await this.userSer.changePass(req.user.username,passDto.oldPass,passDto.newPass);
    }

    // @UseGuards(jwtGuard)
    @Post("certificate")
    sendDoctorCertificate(@Body() medicalNumber: number, @Req() req: UserRequest){
        // check w scrapin
        // check if already doctor
        // send to manager
    }
}
