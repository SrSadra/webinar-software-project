import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(private readonly userRep : userRepository, 
        // private authSer : AuthService,
        private readonly profileRep : profileRepository){}

    async getAllUsers(){
        return await this.userRep.findAll();
    }

    // async changePass(username, oldPass, newPass){
    //     const user = await this.userRep.findOneByUsername(username);
    //     if (!user){
    //         throw new NotFoundException("User not found!");
    //     }
    //     const verify = await this.authSer.validatePassword(oldPass, user.password);
    //     if (!verify){
    //         throw new UnauthorizedException("Wrong Password!");
    //     }
    //     const hashed = await this.authSer.hashPassword(newPass);
    //     user.password = hashed;
    //     await this.userRep.save(user);
    // }


    async getProfileByUsername(username: string){
        return await this.profileRep.getProfileByUsername(username);
    }
}
