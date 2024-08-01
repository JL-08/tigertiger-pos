import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateCategoryItemDto } from 'src/category-items/dto/create-category-item.dto';
import { CategoryItem } from 'src/category-items/entities/category-item.entity';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'name should have 1-10 characters' })
  name: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryItemDto)
  categoryItems: CreateCategoryItemDto[];
}
