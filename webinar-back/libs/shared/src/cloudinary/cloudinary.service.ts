import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudi} from 'cloudinary';
import { MulterFile } from '../interfaces/multer.interface';
import toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryService {
    constructor(@Inject("CLOUDINARY") private cloudinary : typeof cloudi){}

    async uploadFiles(files: MulterFile[], location: string): Promise<string[]>{
        const uploadedFilesUrls = files.map(async (file) => await (await this.uploadFile(file, location)).url);
        return await Promise.all(uploadedFilesUrls);
    }

    uploadFile(file: MulterFile, location: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {     
          // console.log(this.cloudinary);
                 
          const upload = this.cloudinary.uploader.upload_stream({ folder: location }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
          toStream(file.buffer).pipe(upload);
        });
    }  
}
