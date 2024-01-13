import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Product name should have a maximum of 20 characters only' })
  name: string;
}
