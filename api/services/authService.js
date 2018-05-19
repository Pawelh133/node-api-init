import User from '../database/model/userModel';
import _ from 'lodash'

export const register = async (name, pass) => {
  const user = await User.find({ where: { 'username': name } })
  if (!_.isNull(user)) {
    return { success: false, statusCode: 400, message: 'wskazany login już istnieje' }
  }

  const cwel = await User.create({ userName: name, password: pass });
  return { success: true, statusCode: 201 }
};
