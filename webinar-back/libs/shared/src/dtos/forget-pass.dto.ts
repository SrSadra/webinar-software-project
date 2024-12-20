import { IsEmail, IsNotEmpty } from "class-validator";

export class forgetPassDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}