import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { DateFilter } from "../enums/dateFilter.enum";

export class FilterWebinarDto {
    // @IsEnum(DateFilter)
    // @Type(() => String)
    // @IsString()
    filterType: string;
  
    @IsOptional()
    @IsDateString()
    startDate?: string;
  
    @IsOptional()
    @IsDateString()
    endDate?: string;
  }