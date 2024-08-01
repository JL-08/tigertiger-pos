import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'name should have 1-20 characters' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'code should have 1-10 characters' })
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
