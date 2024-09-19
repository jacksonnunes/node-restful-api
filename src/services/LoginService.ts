import bcrypt from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';

import { users } from '../data/users';
import { AppError } from '../errors/AppError';

export class LoginService {
  public async execute(username: string, encryptedPassword: string): Promise<string> {
    const user = users.find(userData => userData.username === username);
    if (!user) {
      throw new AppError('Invalid credentials');
    }

    const isMatchPassword = await bcrypt.compare(user.password, encryptedPassword);
    if (!isMatchPassword) {
      throw new AppError('Invalid credentials');
    }

    return sign(
      {
        userId: user.id,
        roles: user.roles
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '1h' });
  }
}