import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  group: string;
}
