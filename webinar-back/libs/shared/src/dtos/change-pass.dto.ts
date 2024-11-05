import { IsString } from "class-validator";

export class changePassDto {
    @IsString()
    oldPass: string;

    @IsString()
    newPass: string;
}