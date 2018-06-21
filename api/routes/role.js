import express from 'express';
import * as roleController from '../controllers/roleController';

const authRoutes = (routename, app) => {
  const router = express.Router();

  router.post('/create', roleController.createRole);

  app.use(routename, router);
}

export default authRoutes;
