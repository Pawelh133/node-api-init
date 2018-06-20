import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const User = sequelizeRegister.define('user', {
  id: {
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

export default User;
