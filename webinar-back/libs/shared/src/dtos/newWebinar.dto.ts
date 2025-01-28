import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { webinarStatus } from "../enums/webinarStatus.enum";

export class newWebinarDto {
    @IsString()
    persianTitle: string;

    @IsString()
    englishTitle: string;

    @IsOptional()
    status?: webinarStatus;

    @IsString()
    @Length(5,100,{message : "Description must be at least 5 characters long"})
    description: string;

    // image:string; //???

    @Transform(({ value }) => Number(value)) // is necessery for this type of send req
    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    discountPercent?: number;

    // invitationLink: string;

    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    onlyDoctor: boolean;

    @IsString()
    categoryName: string; // maybe id in future

    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
    subCategoryNames : string[];
    
    // @IsArray()
    // subCategoryNames: string[];
}