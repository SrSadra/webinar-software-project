import { IsDate, IsNumber, IsString } from "class-validator";

export class newEpisodeDto {

    @IsString()
    title: string;

    @IsDate()
    startTime: Date;

    @IsDate()
    endTime: Date;

    // @IsNumber()
    // webinarId: number;
}