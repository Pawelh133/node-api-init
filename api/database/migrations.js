import dotenv from 'dotenv/config';
import sequelizeRegister from '../register/sequelizeRegister';
import User from './model/user';
import Role from './model/role';
import UsersRoles from './model/usersRoles';

//UsersRoles
User.belongsToMany(Role, {
  through: UsersRoles,
  foreignKey: 'userId',
});
Role.belongsToMany(User, {
  through: UsersRoles,
  foreignKey: 'roleId',
});
//

sequelizeRegister.sync({ force: process.env.DB_CREATE_WITH_FORCE });
