import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class newEpisodeDto {

    @IsString()
    title: string;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
      // Convert MM/DD/YYYY to a Date object
      const parts = value.split('/');
      const [month, day, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    })
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
      // Convert MM/DD/YYYY to a Date object
      const parts = value.split('/');
      const [month, day, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    })
    endTime: Date;

    // @IsNumber()
    // webinarId: number;
}