import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const UsersRoles = sequelizeRegister.define('usersRoles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.UUID
  },
  roleId: {
    type: Sequelize.INTEGER
  },
}, { timestamps: false });

export default UsersRoles;