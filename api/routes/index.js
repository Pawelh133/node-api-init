import validate from 'express-validation';
import userRoutes from './user';

const router = (app) => {
  userRoutes('/users', app);
}

export default router;
