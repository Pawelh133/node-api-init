import validate from 'express-validation';
import userRoutes from './user';
import authRoutes from './auth';

const router = (app) => {
  authRoutes('/auth', app);
  userRoutes('/users', app);
}

export default router;
