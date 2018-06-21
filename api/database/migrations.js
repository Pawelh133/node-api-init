import dotenv from 'dotenv/config';
import Sequelize from 'sequelize';
import sequelizeRegister from '../register/sequelizeRegister';
import User from './model/user';
import Role from './model/role';
import UsersRoles from './model/usersRoles';
import AppClients from './model/appClients';
import RefreshTokens from './model/refreshTokens';

AppClients.hasMany(RefreshTokens, {
  foreignKey: 'clientId'
});

//UsersRoles
User.hasMany(RefreshTokens, {
  foreignKey: 'userId',
});

User.belongsToMany(Role, {
  through: UsersRoles,
  foreignKey: 'userId',
});

Role.belongsToMany(User, {
  through: UsersRoles,
  foreignKey: 'roleId',
});

// console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$4', models);
// Object.values(models)
//   .filter(model => model.associate)
//   .forEach(model => model.associate(models));

sequelizeRegister.sync({ force: process.env.DB_CREATE_WITH_FORCE }).then(() => {
  const userId = '21c86c51-81ed-4f1e-b94c-1edd55a7b8aa';
  const roleId = 1;

  AppClients.create({
    name: 'cwel',
    active: true
  });
  User.create({
    id: userId,
    userName: 'pawelh133',
    password: 'cwel123',
    isConfirmed: true
  });
  Role.create({
    id: roleId,
    name: 'admin'
  })
  // UsersRoles.create({
  //   userId: userId,
  //   roleId: roleId
  // })
});
