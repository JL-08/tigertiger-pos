import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDTO } from 'src/shared/base.dto';

export class CreateCategoryDto extends BaseDTO<CreateCategoryDto> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Product name should have a maximum of 20 characters only' })
  name: string;
}
