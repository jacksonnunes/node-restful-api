import { RoleEnum } from '../enums/RoleEnum';
import { IUser } from '../types/IUser';

export const users: IUser[] = [
  {
    id: 'john_doe_id',
    username: 'john_doe',
    password: 'johndoe123*',
    roles: [
      RoleEnum.ADMIN,
    ],
  },
  {
    id: 'jane_doe_id',
    username: 'jane_doe',
    password: 'janedoe456#',
    roles: [
      RoleEnum.USER,
    ],
  },
];