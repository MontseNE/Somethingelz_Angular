import { User } from './user.interface';

// export interface LoginResponse {
//   id: string;
//   email: string;
//   password: string;
//   name: string;
//   isActive: boolean;
//   roles: string[];
//   favList: any[];
//   token: string;
// }

export interface LoginResponse {
  user: User;
  token: string;
}

