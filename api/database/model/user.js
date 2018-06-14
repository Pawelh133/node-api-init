import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';
import Role from './role';
import RefreshToken from './refreshToken';

const User = sequelizeRegister.define('user', {
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN
  },
});

User.hasMany(Role, { as: 'role' })
User.hasMany(RefreshToken, { as: 'refreshToken' })

export default User;
