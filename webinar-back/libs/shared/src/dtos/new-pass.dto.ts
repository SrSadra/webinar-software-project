import { IsString, Length } from "class-validator";

export class newPasswordDto {
    @IsString()
    @Length(6,50 ,{message : "Password length Must be longer than 6 charcters"})
    newpass: string;
}