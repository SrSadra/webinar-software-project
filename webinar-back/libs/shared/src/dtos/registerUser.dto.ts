import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
    nationalCode?: number;

    @IsNotEmpty()
    phoneNumber: string; // ??

    @IsOptional()
    whatsAppNumber: string; //??

    //education: 
    
}