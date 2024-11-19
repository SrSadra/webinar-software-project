import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { webinarStatus } from "../enums/webinarStatus.enum";

export class newWebinarDto {
    @IsString()
    persianTitle: string;

    @IsString()
    englishTitle: string;

    @IsNotEmpty()
    status: webinarStatus;

    @IsString()
    @Length(5,50,{message : "Description must be at least 5 characters long"})
    description: string;

    // image:string; //???

    @IsNumber()
    price: number;

    @IsNumber()
    discountPercent?: number;

    // invitationLink: string;

    @IsBoolean()
    onlyDoctor: boolean;

    @IsString()
    categoryName: string; // maybe id in future

    @IsArray()
    subCategoryNames : string[];
    
    // @IsArray()
    // subCategoryNames: string[];
}