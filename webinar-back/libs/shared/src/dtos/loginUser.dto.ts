import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class loginUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6,50 ,{message : "Password length Must be longer than 6 charcters"})
    password: string;
}