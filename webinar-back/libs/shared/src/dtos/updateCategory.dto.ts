import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class updateCategoryDto {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean; // To update the activation status
  
    @IsOptional()
    @IsArray()
    subCategoriesToAdd?: string[]; // Titles of subcategories to add
  
    @IsOptional()
    @IsArray()
    subCategoriesToRemove?: string[]; // IDs of subcategories to remove
}