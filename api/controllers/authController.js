import setResponse from '../helpers/statusMessageHelper';
import * as authService from '../services/authService';
import * as roleService from '../services/roleService';
import * as tokenService from '../services/tokenService';
import statusCode from '../constants/statusCode';

export const register = async (req, res) => {
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

  setResponse(res, { statusCode: statusCode.created, userId: response.userId, message: response.message });
}

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userResult = await authService.getUserbyAuth(username, password);

  if (userResult.success) {
    const getRolesResult = await roleService.getUserRoles(username);

    if (getRolesResult.success) {
      const assignRefreshTokenResult = await tokenService.assignUserRefreshToken(userResult.user, getRolesResult.roles);

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
    setResponse(res, { statusCode: userResult.statusCode, message: userResult.message });
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
