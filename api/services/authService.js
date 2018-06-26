import Sequelize from 'sequelize';
import _ from 'lodash';

import { saltHashPassword } from '../helpers/passwordEncryptHelper';
import statusCode from '../constants/statusCode';

export const register = async (name, pass) => {
  try {
    const user = await models.User.find({ where: { 'username': name } });

    if (user) {
      return { success: false, statusCode: 400, message: 'wskazany login już istnieje' }
    }

    const encryptedPassword = saltHashPassword(pass);
    const userId = await models.User.create(
      {
        userName: name,
        password: encryptedPassword.password,
        salt: encryptedPassword.salt
      });

    return { success: true, data: { userId: userId.dataValues.userId } }
  } catch (e) {
    throw { success: false, message: `wystapił błąd podczas tworzenia konta: ${e.message}` }
  }
};
