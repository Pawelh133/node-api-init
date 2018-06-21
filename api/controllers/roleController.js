import setResponse from '../helpers/statusMessageHelper';
import * as roleService from '../services/roleService';
import statusCode from '../constants/statusCode';

export const createRole = async (req, res) => {
  try {
    const response = await roleService.createRole(req.body.roleName);
    if (response.success === true) {
      setResponse(res, { statusCode: statusCode.created });
    }
    else {
      setResponse(res, { statusCode: response.statusCode, message: response.message });
    }
  }
  catch (e) {
    setResponse(res, { statusCode: statusCode.error, message: `Wystąpił błąd podczas tworzenia roli: ${e.message}` });
  }
}
