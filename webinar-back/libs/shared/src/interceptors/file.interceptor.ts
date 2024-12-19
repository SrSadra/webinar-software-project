import { Inject } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CloudinaryProvider } from "../cloudinary/cloudinary.provider";
import * as cloudinary from "cloudinary";

export class MultipleFilesInterceptor{
    constructor(@Inject("cloudinary") private cloudinaryRep: typeof cloudinary){}

    public CloudinaryInterceptor(maxFile: number, htmlname: string, folderName : string) {
        return FilesInterceptor(htmlname, maxFile, {
            storage: new CloudinaryStorage({
                cloudinary: this.cloudinaryRep.v2,
            //     params: {
            //         folder: "myfolder"
            //         // : "auto"
            //     } //???
            })
        })
    }
}

