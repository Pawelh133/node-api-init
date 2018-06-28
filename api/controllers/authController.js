import setResponse from '../helpers/statusMessageHelper';
import * as authService from '../services/authService';
import * as roleService from '../services/roleService';
import * as tokenService from '../services/tokenService';
import statusCode from '../constants/statusCode';


let refreshTokens = {};

export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      setResponse({
        statusCode: statusCode.badRequest,
        message: 'username nie może być pusty'
      });

      return;
    }

    if (password.length < process.env.MIN_PASSWORD_LENGTH) {
      setResponse({
        statusCode: statusCode.badRequest,
        message: `hasło musi zawierać przynajmniej ${process.env.MIN_PASSWORD_LENGTH} znaki.`
      });

      return;
    }

    const response = await authService.register(username, password);
    if (response.success === true) {
      setResponse(res, { statusCode: statusCode.created });
    }
    else {
      setResponse(res, { statusCode: statusCode.badRequest, message: response.message });
    }
  }
  catch (e) {
    setResponse(res, { statusCode: statusCode.error, message: e.message });
  }
}

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await authService.getUserbyAuth(username, password);

  if (result.success) {
    const getRolesResult = await roleService.getUserRoles(username);

    if (getRolesResult.success) {
      const assignRefreshTokenResult = await tokenService.assignUserRefreshToken(result.user, getRolesResult.roles);

      if (assignRefreshTokenResult.success) {
        res.status(statusCode.ok);
        res.json({ token: 'JWT ' + assignRefreshTokenResult.token, refreshToken: assignRefreshTokenResult.refreshToken })
      }
      else {
        setResponse(res, { statusCode: assignRefreshTokenResult.statusCode, message: assignRefreshTokenResult.message });
      }
    }
    else {
      setResponse(res, { statusCode: getRolesResult.statusCode, message: getRolesResult.message });
    }
  }
  else {
    setResponse(res, { statusCode: result.statusCode, message: result.message });
  }
}

export const token = async (req, res) => {
  const result = await tokenService.generateToken(req.body.userName, req.body.refreshToken);

  setResponse(res, {
    message: result.message,
    statusCode: result.statusCode,
    token: result.token,
    refreshToken: result.refreshToken,
    expiresIn: result.expiresIn
  });
}

export const tokenReject = async (req, res) => {
  const result = await tokenService.tokenReject(req.body.refreshToken);

  setResponse(res, { statusCode: result.statusCode, message: result.message });
}
