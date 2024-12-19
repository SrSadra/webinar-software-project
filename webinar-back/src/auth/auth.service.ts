import { loginUserDto } from '@app/shared/dtos/loginUser.dto';
import { newPasswordDto } from '@app/shared/dtos/new-pass.dto';
import { registerUserDto } from '@app/shared/dtos/registerUser.dto';
import { ManagerEntity } from '@app/shared/entities/manager.entity';
import { userEntity } from '@app/shared/entities/user.entity';
import { Roles } from '@app/shared/enums/roles.enum';
import { ForgetPassword } from '@app/shared/interfaces/forgetPassword.interface';
import { managerRepository } from '@app/shared/interfaces/repos/manager.repository';
import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { MailService } from '@app/shared/mailsender/mail.service';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import {nanoid} from "nanoid"

@Injectable()
export class AuthService {
    constructor(private readonly jwtSer: JwtService, private readonly userRep : userRepository, private readonly profileRep : profileRepository, private readonly managerRep : managerRepository,private readonly mailSer: MailService){}

    async login(user : Readonly<loginUserDto>){
        try{
          const {email, password } = user;

          let foundedUser: ManagerEntity| userEntity = await this.managerRep.findByCondition({where : {email}});
          console.log(foundedUser);
          if (!foundedUser){
            foundedUser = await this.findUserByEmail(email);
          }
          if (!foundedUser){
            throw new UnauthorizedException();
          }
          console.log(foundedUser);
          const validate = this.validatePassword(password,foundedUser.password);
          if (!validate){
            throw new UnauthorizedException();
          }
    
          delete foundedUser.password;
          const token = this.jwtSer.sign({user : foundedUser});
          return token;
        }catch (err){
          console.log(err);
        }
      }

      async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 13);
      }
    
    async register(createUser : Readonly<registerUserDto>){ // with readonly you can just get the attrbute and not changing them. it improves safety
        try{
          const {email , password } = createUser;
          console.log(email,password);
          let user = await this.findUserByEmail(email);
          let manager: ManagerEntity;
          if (!user){
            const hashed = await this.hashPassword(password);

            if(createUser.username.endsWith("_admin")){//tmp
              manager = await this.managerRep.save({ //cng
                ...createUser,
              });
              delete manager.password;
              return manager;
            }else{
                user = await this.userRep.save({
                ...createUser,
                password : hashed,
              });
            }

            // if (createUser.username === 'sadra2_admin'){
            //   user.role = Roles.MANAGER;
            // }
            // const profile = this.profileRep.save({
            //   graduation : 
            // })
            delete user.password; //?? in react
            return user; //? in react
          }
          else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
          }
        }catch (err){
          console.log(err);
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
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

    async forgotPassword(email: string){
      const user = await this.userRep.findOneByEmail(email);
      if (!user){
         throw new NotFoundException("User not found!");
      }
      const resetToken = "uen89wre8"
      // = nanoid(64);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const token = this.jwtSer.sign({resetLink : resetToken, expDate:expiryDate, email: user.email} as ForgetPassword);
      await this.mailSer.sendPasswordResetEmail(email,token);
    }

    async resetPass(newPass : newPasswordDto, token: string){
      const decodedData = this.jwtSer.decode(token) as ForgetPassword;
      const {expDate,email} = decodedData;
      if (expDate.getHours() < (new Date().getHours())){
        throw new UnauthorizedException('Invalid link');
      }
      const foundeduser = await this.findUserByEmail(email);
      if (!foundeduser){
        throw new NotFoundException("User not found!");
      }
      foundeduser.password = await this.hashPassword(newPass.newpass);
      return await this.userRep.save(foundeduser);
    }

    async findUserByEmail(email : string){ // this also extract pass
        return await this.userRep.findByCondition({ where: { email },
          select: ['username', 'firstname', 'lastname', 'email', 'password', "phoneNumber", "role"],
        })
    }
}
