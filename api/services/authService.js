import User from '../database/model/user';
import { saltHashPassword } from '../helpers/passwordEncryptHelper';

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

    return { success: true, statusCode: 201, data: { userId: userId.dataValues.userId } }
  } catch (error) {
    return { success: false, statusCode: 500, message: `wystapił błąd podczas tworzenia kąta: ${error}` }
  }
};