import validate from 'express-validation';
import express from 'express';
import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import passport from 'passport';

import { mongooseIdRegExp } from '../config/values';
import * as userController from '../controllers/userController';
import * as userValidation from '../validation/user';

const userRoutes = (routename, app) => {
  const router = express.Router();

  router.param('userId', (req, res, next, id) => {
    const userIdValidRegExp = new RegExp(mongooseIdRegExp);
    userIdValidRegExp.test(id) ? next() : res.sendStatus(404);
  });

  router.get('/', passport.authenticate('jwt'), userController.listUsers);
  router.get('/:userId', userController.getUserById);
  router.post('/', validate(userValidation.create), userController.createUser);
  router.delete('/:userId', )

  app.use(routename, router);
}

export default userRoutes;
