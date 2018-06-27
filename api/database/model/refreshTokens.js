import Sequelize from 'sequelize';
import sequelizeRegister from '../../register/sequelizeRegister';

const RefreshTokens = sequelizeRegister.define('refreshTokens', {
  userId: {
    type: Sequelize.UUID
  },
  refreshToken: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  expiresIn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

export default RefreshTokens;