import express from 'express';
import * as authController from '../controllers/authController';

const authRoutes = (routename, app) => {
  const router = express.Router();

  router.post('/login', authController.login);
  router.post('/token', authController.token);
  router.post('/token/reject', authController.tokenReject)

  app.use(routename, router);
}

export default authRoutes;