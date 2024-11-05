import { loginUserDto } from '@app/shared/dtos/loginUser.dto';
import { registerUserDto } from '@app/shared/dtos/registerUser.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authSer : AuthService){}

    @Post("login")
    async login(@Body() loginDto : loginUserDto){
        return await this.authSer.login(loginDto);
    }

    @Post("register")
    async register(@Body() registerDto : registerUserDto){
        return await this.authSer.register(registerDto);
    }
}
