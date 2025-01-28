import { forgetPassDto } from '@app/shared/dtos/forget-pass.dto';
import { loginUserDto } from '@app/shared/dtos/loginUser.dto';
import { newPasswordDto } from '@app/shared/dtos/new-pass.dto';
import { registerUserDto } from '@app/shared/dtos/registerUser.dto';
import { Body, Controller, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authSer : AuthService){}

    @Post("login")
    async login(@Body() loginDto : loginUserDto,@Res({passthrough: true}) res : Response){
        const tmp = await this.authSer.login(loginDto);
        if (!tmp.token){
            res.status(401)
            return tmp;
        }
        console.log("token..." ,tmp);
        res.cookie('Authentication', tmp, {
            httpOnly: true, // Prevents client-side scripts from accessing the cookie
            sameSite: 'strict', // Protect against CSRF
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });
        return tmp;
    }

    @Post("register")
    async register(@Body() registerDto : registerUserDto){
        return await this.authSer.register(registerDto);
    }

    @Put("reset-password")//need check
    async resetPass(@Body() newPasword: newPasswordDto,@Query("token") token : string){ // jwt token
        return await this.authSer.resetPass(newPasword,token);
    }

    @Post("forget-password")
    async forgetPass(@Body() email: forgetPassDto){
        return await this.authSer.forgotPassword(email);
    }
}
