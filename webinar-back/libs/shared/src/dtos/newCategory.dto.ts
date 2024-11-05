import { IsOptional, IsString } from "class-validator";

export class newCategoryDto {
    @IsString()
    title: string;

    @IsOptional()
    subCategory?: string[]; // array or string
}