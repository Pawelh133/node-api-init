import dotenv from 'dotenv/config';
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

const models = {
  Role: Role,
  User: User,
  UsersRoles: UsersRoles,
  AppClients: AppClients,
  RefreshTokens: RefreshTokens
}

export default models;

