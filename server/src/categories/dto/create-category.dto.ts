import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateCategoryItemDto } from 'src/category-items/dto/create-category-item.dto';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Category name should have a maximum of 10 characters only' })
  name: string;

  @ApiProperty()
  categoryItems: CreateCategoryItemDto[];
}
