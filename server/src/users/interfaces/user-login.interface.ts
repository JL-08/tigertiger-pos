import { Role } from '../enums/role.enum';

export interface UserLogin {
  username: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}
