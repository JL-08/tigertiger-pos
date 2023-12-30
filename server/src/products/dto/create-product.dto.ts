import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { BaseDTO } from 'src/shared/base.dto';

export class CreateProductDto extends BaseDTO<CreateProductDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Product name should have a maximum of 20 characters only' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @Validate((value) => value instanceof Category, {
    message: 'Product category must be a valid Category entity.',
  })
  category: Category;
}
