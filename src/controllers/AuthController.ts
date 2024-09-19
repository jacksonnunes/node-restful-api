import { NextFunction, Request, Response } from 'express';

import { LoginService } from '../services/LoginService';

export class AuthController {
  public async login(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = request.body;
      
      const loginService = new LoginService();
      const token = await loginService.execute(username, password);

      return response.json(token);
    } catch (error) {
      next(error);
    }
  }

  public async auth(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.json('Welcome admin!');
  }
}