import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreatePriceDto } from 'src/prices/dto/create-price.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Product name should have a maximum of 20 characters only' })
  name: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsUUID()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  prices: CreatePriceDto[];
}
