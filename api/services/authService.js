import Sequelize from 'sequelize';

import User from '../database/model/user';
import Role from '../database/model/role';
import { saltHashPassword } from '../helpers/passwordEncryptHelper';
import UsersRoles from '../database/model/usersRoles';

export const register = async (name, pass) => {
  const user = await User.find({ where: { 'username': name } });

  if (user) {
    return { success: false, statusCode: 400, message: 'wskazany login już istnieje' }
  }

  const encryptedPassword = saltHashPassword(pass);

  try {
    const userId = await User.create(
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

export const getUser = async (name, pass) => {
  try {
    const user = await User.findOne({
      where: { 'username': name },
      include: {
        model: Role
      }
    });

    if (user) {

    }

    return user;
  }
  catch (e) {
    console.log(e)
  }
}