import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  @ApiProperty()
  @IsOptional()
  refreshToken: string;
}
