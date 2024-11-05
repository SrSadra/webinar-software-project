import { loginUserDto } from '@app/shared/dtos/loginUser.dto';
import { registerUserDto } from '@app/shared/dtos/registerUser.dto';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly jwtSer: JwtService, private readonly userRep : userRepository){}

    async login(user : Readonly<loginUserDto>){
        try{
          const {email, password } = user;
          const foundedUser = await this.findUserByEmail(email);
          if (!foundedUser){
            throw new UnauthorizedException();
          }
          const validate = this.validatePassword(password,foundedUser.password);
          if (!validate){
            throw new UnauthorizedException();
          }
    
          delete foundedUser.password;
          const token = this.jwtSer.sign({user : foundedUser});
    
          return token;
        }catch{
          throw new UnauthorizedException();
        }
      }

      async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 13);
      }
    
    async register(createUser : Readonly<registerUserDto>){ // with readonly you can just get the attrbute and not changing them. it improves safety
        try{
          const {email , password } = createUser;
          console.log(email,password);
          const user = await this.findUserByEmail(email);
          if (!user){
            const hashed = await this.hashPassword(password);
            const user = await this.userRep.save({
              ...createUser,
              password : hashed
            });
    
            delete user.password; //?? in react
            return user; //? in react
          }
          else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
          }
        }catch{
          throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }
    
    async validatePassword(pass : string, hashed : string){
        return await bcrypt.compare(pass, hashed);
    }


    async jwtVerify(jwt: string){
        if (!jwt){
          throw new UnauthorizedException();
        }
        try {
          const { email, password, exp } = await this.jwtSer.verify(jwt);
          return { email, password, exp };
        } catch (error) {
          throw new UnauthorizedException();
        }
    }
    
    // async getUserFromJwt(jwt: string): Promise<UserJwt> {
    //     if (!jwt) return;
    
    //     try {
    //       return this.jwtSer.decode(jwt) as UserJwt;
    //     } catch (error) {
    //       throw new BadRequestException();
    //     }
    // }

    async findUserByEmail(email : string){
        return await this.userRep.findByCondition({ where: { email },
          select: ['username', 'firstname', 'lastname', 'email', 'password', "phoneNumber", "role"],
        })
    }
}
