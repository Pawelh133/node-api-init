import * as userController from '../controllers/userController';

const routes = (app) => {
  // todoList Routes
  app.route('/users')
    .get(userController.listUsers)
    .post(userController.createUser);


  app.route('/users/:userId')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};

export default routes;
