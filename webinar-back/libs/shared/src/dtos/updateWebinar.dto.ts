import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { webinarStatus } from "../enums/webinarStatus.enum";

export class updateWebinarDto {
    @IsString()
    @IsOptional()
    persianTitle?: string;

    @IsString()
    @IsOptional()
    englishTitle?: string;

    @IsOptional()
    status?: webinarStatus;

    @IsString()
    @IsOptional()
    @Length(5,100,{message : "Description must be at least 5 characters long"})
    description?: string;

    // image:string; //???

    @Transform(({ value }) => Number(value)) // is necessery for this type of send req
    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    discountPercent?: number;

    // invitationLink: string;

    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    @IsOptional()
    onlyDoctor?: boolean;

    @IsString()
    @IsOptional()
    categoryName?: string; // maybe id in future

    @IsArray()
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
    subCategoryNames? : string[];
    
    // @IsArray()
    // subCategoryNames: string[];
}