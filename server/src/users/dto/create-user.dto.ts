import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { BaseDTO } from 'src/shared/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO extends BaseDTO<CreateUserDTO> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Username should be a minimum of 3 characters.' })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password should be a minimum of eight characters and has at least one letter and one number.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
