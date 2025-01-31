import { CloudinaryService } from '@app/shared/cloudinary/cloudinary.service';
import { MulterFile } from '@app/shared/interfaces/multer.interface';
import { certificateRepository } from '@app/shared/interfaces/repos/certificates.repository';
import { profileRepository } from '@app/shared/interfaces/repos/profile.repository';
import { userRepository } from '@app/shared/interfaces/repos/user.repository';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import puppeteer from 'puppeteer-core';
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

    async validateMedicalNumber(medicalNumber: number) {
        const browser = await puppeteer.launch({ headless: true , executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"}); // Run in headless mode
        const page = await browser.newPage();

        try {
            const targetUrl = 'https://membersearch.irimc.org'; // Replace with actual URL
            await page.goto(targetUrl, { waitUntil: 'networkidle2' });

            // Enter medical number in the input field (update selector accordingly)
            await page.type('#McCode', medicalNumber.toString());

            // Click the submit button (update selector accordingly)
            await page.click('#btnSearch');

            console.log("dadk");
            
            // Wait for the response to load (update selector accordingly)
            page
            .waitForSelector('#DataTables_Table_0_length')
            .then(() => {console.log('First URL with image: ')
            return "ajab";
            });
            // console.log("fff");
            // // Extract validation result from the page
            // const validationResult = await page.evaluate(() => {
            //     const resultElement = document.querySelector('#DataTables_Table_0');
            //     console.log(resultElement);
            //     // return resultElement ? resultElement.textContent.trim() : null;
            // });

            // console.log(validationResult);
            

            // Close the browser
            // await browser.close();

            // // Determine if the number is valid (adjust logic based on actual response)
            // return validationResult === 'Valid Medical Number';
        } catch (error) {
            // await browser.close();
            throw new BadRequestException('Error validating medical number');
        }
    }


    async getProfileByUsername(username: string){
        return await this.profileRep.getProfileByUsername(username);
    }
}
