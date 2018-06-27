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
    password: '7c4873529f2b8448e8db55119047c670e33b30b783803241ad3b5bb280409d14aea731d308e9f028edca9b93c508aa19e1105cc3d86b905045c6e28a5d180427',
    salt: '8048249ba996013a',
    isConfirmed: true
  });
  models.Role.create({
    id: roleId,
    name: 'admin'
  });
  models.UsersRoles.create({
    userId: userId,
    roleId: roleId
  });
});
