import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Group name should have a maximum of 20 characters only' })
  name: string;
}
