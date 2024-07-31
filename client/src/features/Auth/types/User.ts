import { Role } from '../../../constants/roles';

export type User = {
  username: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
};
