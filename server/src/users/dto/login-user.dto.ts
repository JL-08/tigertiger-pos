import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { BaseDTO } from 'src/shared/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO extends BaseDTO<LoginUserDTO> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
