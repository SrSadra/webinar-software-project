import { Transform } from "class-transformer";
import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { loginUserDto } from "./loginUser.dto";

export class registerUserDto extends loginUserDto{
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    persianN?: string;

    @IsString()
    @IsOptional()
    firstname?: string;

    @IsOptional()
    lastname?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : null))
    nationalCode?: number;

    @IsNotEmpty()
    phoneNumber: string; // ??

    @IsOptional()
    whatsAppNumber?: string; //??

    //education: 
    
}