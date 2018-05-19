import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const User = sequelizeRegister.define('user', {
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN
  }
});

export default User;
