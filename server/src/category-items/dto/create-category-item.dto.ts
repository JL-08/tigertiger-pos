import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Category item name should have a maximum of 20 characters only' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Category item name should have a maximum of 10 characters only' })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;
}
