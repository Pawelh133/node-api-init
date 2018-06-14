import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const Role = sequelizeRegister.define('role', {
  userId: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  },
})

export default Role;