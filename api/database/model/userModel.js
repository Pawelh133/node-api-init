import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const User = sequelizeRegister.define('user', {
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
