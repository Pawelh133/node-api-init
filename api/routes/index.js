import validate from 'express-validation';
import userRoutes from './user';
import authRoutes from './auth';
import roleRoutes from './role';

const router = (app) => {
  authRoutes('/auth', app);
  userRoutes('/user', app);
  roleRoutes('/role', app);
}

export default router;
