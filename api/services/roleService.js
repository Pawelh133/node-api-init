import Role from '../database/model/role';

export const createRole = async (roleName) => {
  const role = await Role.find({ where: { 'name': roleName } });

  if (role) {
    return { success: false, statusCode: 400, message: 'wskazana rola już istnieje.' }
  }

  try {
    await Role.create({ name: roleName });

    return { success: true }
  } catch (e) {
    throw { message: `wystapił błąd podczas tworzenia konta: ${e}` }
  }
};