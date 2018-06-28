import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const appClients = sequelizeRegister.define('appClients', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING
  },
  ApplicationType: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  refreshTokenLifeTime: {
    type: Sequelize.INTEGER
  },
  allowedOrigin: {
    type: Sequelize.STRING
  }
});

export default appClients;