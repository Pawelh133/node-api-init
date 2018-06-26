import dotenv from 'dotenv/config';
import sequelizeRegister from '../register/sequelizeRegister';
import models from './migrations';

sequelizeRegister.sync({ force: process.env.DB_CREATE_WITH_FORCE }).then(() => {
  const userId = '21c86c51-81ed-4f1e-b94c-1edd55a7b8aa';
  const roleId = 1;

  models.AppClients.create({
    name: 'cwel',
    active: true
  });
  models.User.create({
    id: userId,
    userName: 'pawelh133',
    password: 'cwel123',
    isConfirmed: true
  });
  models.Role.create({
    id: roleId,
    name: 'admin'
  })
  models.UsersRoles.create({
    userId: userId,
    roleId: roleId
  })
});
