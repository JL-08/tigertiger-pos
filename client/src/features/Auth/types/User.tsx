import { Role } from '../../../constants/roles';

export type User = {
  username: string;
  role: Role;
  token: string;
};
