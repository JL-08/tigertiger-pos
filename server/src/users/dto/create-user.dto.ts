import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { CreateBaseDTO } from 'src/shared/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUsersDTO extends CreateBaseDTO<CreateUsersDTO> {
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
