import express from 'express';
import * as authController from '../controllers/authController';

const authRoutes = (routename, app) => {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.post('/token', authController.token);
  router.delete('/token', authController.tokenReject);

  app.use(routename, router);
}

export default authRoutes;
