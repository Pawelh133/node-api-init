import Sequelize from 'sequelize';
import _ from 'lodash';

import { saltHashPassword, compareHashedPassword } from '../helpers/passwordEncryptHelper';
import statusCode from '../constants/statusCode';
import models from '../database/migrations';

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

export const getUserbyAuth = async (name, pass) => {
  try {
    const user = await models.User.find({
      where: {
        userName: name
      }
    });
    
    if (user) {
      const compareSuccess = compareHashedPassword(pass, user.dataValues.password, user.dataValues.salt);

      if (compareSuccess) {
        return { success: true, user: user.dataValues }
      }
      
      return { success: false, statusCode:statusCode.notFound, message: 'login lub hasło jest nieprawidłowe' }
    }
    else {
      return { success: false, statusCode: statusCode.notFound, message: 'login lub hasło jest nieprawidłowe' }
    }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: 'error occured during getting user' }
  }
}
