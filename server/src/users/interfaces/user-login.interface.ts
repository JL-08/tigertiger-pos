import { Role } from 'src/roles/entities/role.entity';

export interface UserLogin {
  username: string;
  role: Role;
  token: string;
}
