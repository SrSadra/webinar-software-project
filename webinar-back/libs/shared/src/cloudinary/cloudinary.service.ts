import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { MulterFile } from '../interfaces/multer.interface';
import toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryService {

    uploadImage(file : MulterFile): Promise<UploadApiResponse | UploadApiErrorResponse>{
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((err , result) => {
                if (err) return reject(err);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        })
        

    }  
}
