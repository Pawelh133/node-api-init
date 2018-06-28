import Role from '../database/model/role';
import models from '../database/migrations';
import _ from 'lodash';
import statusCode from '../constants/statusCode';

export const getUserRoles = async (name) => {
  try {
    const result = await models.User.findOne({
      where: { userName: name },
      attributes: [],
      include: {
        model: models.Role,
        attributes: ['name'],
      }
    }, { rejectIfEmpty: false });

    if (!result) {
      return { success: false, statusCode: statusCode.notFound }
    }
    else if (_.isEmpty(result.roles)) {
      return { success: false, statusCode: statusCode.error, message: 'user does not contain roles' }
    }

    return { success: true, roles: _.map(result.roles, role => role.dataValues.name) }
  }
  catch (e) {
    return { success: false, statusCode: statusCode.error, message: err }
  }
}

export const createRole = async (roleName) => {
  const role = await Role.find({ where: { 'name': roleName } });

  if (role) {
    return { success: false, statusCode: statusCode.badRequest, message: 'wskazana rola już istnieje.' }
  }

  try {
    await Role.create({ name: roleName });

    return { success: true, statusCode: statusCode.created }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: e }
  }
};

