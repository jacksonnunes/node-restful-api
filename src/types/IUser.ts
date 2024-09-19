import { RoleEnum } from '../enums/RoleEnum';

export interface IUser {
    id: string;
    username: string;
    password: string;
    roles: RoleEnum[];
}