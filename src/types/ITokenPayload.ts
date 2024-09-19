import { JwtPayload } from 'jsonwebtoken';
import { RoleEnum } from '../enums/RoleEnum';

export interface ITokenPayload extends JwtPayload {
  userId: string;
  roles: RoleEnum[];
}