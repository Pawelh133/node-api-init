import setResponse from '../helpers/statusMessageHelper';
import * as roleService from '../services/roleService';

export const createRole = async (req, res) => {
  const response = await roleService.createRole(req.body.roleName);

  setResponse(res, { statusCode: response.statusCode, message: response.message });
}
