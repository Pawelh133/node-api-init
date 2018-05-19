import Sequelize from 'sequelize';
import sequelizeConfig from '../sequelizeRegister';

const User = sequelizeConfig.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  cwel: {
    type: Sequelize.STRING
  }
});

export default User;
