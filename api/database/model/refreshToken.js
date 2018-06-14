import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const RefreshToken = sequelizeRegister.define('refreshTokens', {
  userId: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  },
})

export default RefreshToken;