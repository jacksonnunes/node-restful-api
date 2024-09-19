import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';
import { isAdmin } from '../middlewares/isAdmin';
import { validateLogin } from '../middlewares/validateLogin';

export const routes = Router();
const authController = new AuthController();

routes.post('/login', validateLogin, authController.login);

routes.get('/admin', isAdmin, authController.auth);