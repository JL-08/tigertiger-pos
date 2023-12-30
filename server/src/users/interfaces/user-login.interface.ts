import { Role } from '../enums/role.enum';

export interface UserLogin {
  username: string;
  role: Role;
  token: string;
}
