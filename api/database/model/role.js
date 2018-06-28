import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const Role = sequelizeRegister.define('role', {
  name: {
    type: Sequelize.STRING
  },
})

export default Role;