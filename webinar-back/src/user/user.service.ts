import { CloudinaryService } from '@app/shared/cloudinary/cloudinary.service';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { certificateRepository } from '@app/shared/interfaces/repos/certificates.repository';
import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(private readonly userRep : userRepository, 
        // private authSer : AuthService,
        private readonly profileRep : profileRepository,
        private readonly certificateRep: certificateRepository,
        private cloudinarySer: CloudinaryService
        ){}

    async getAllUsers(){
        return await this.userRep.findAll();
    }

    async uploadUserDocument(fileTitles: string[],files : MulterFile[] , username: string){
        fileTitles.forEach(async (el) => {
            const isFounded = await this.certificateRep.findByTitle(el);
            if (isFounded){
                throw new ConflictException("This certificate name already exist!");
            }
        });
        const filesUrl = await this.cloudinarySer.uploadFiles(files, `user/${username}/certificates`);
        await this.certificateRep.saveMany(fileTitles.map((el, index) => {
            return this.certificateRep.create({
                title: el,
                imageLink: filesUrl[index]
            })
        }));
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
