import { IsString, Length } from "class-validator";

export class changePassDto {
    @IsString()
    oldPass: string;

    @IsString()
    @Length(6,50 ,{message : "Password length Must be longer than 6 charcters"})
    newPass: string;
}