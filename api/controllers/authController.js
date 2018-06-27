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
    const getRoleResult = await roleService.getUserRoles(username);
    if (getRoleResult.success) {
      const assignRefreshTokenResult = await tokenService.assignUserRefreshToken(result.user);
      if (assignRefreshTokenResult.success) {
        res.status(statusCode.ok);
        res.json({ token: 'JWT ' + assignRefreshTokenResult.token, refreshToken: assignRefreshTokenResult.refreshToken })
      }
      else {
        setResponse(res, { statusCode: assignRefreshTokenResult.statusCode, message: assignRefreshTokenResult.message });
      }
    }
    else {
      setResponse(res, { statusCode: getRoleResult.statusCode, message: getRoleResult.message });
    }
  }
  else {
    setResponse(res, { statusCode: result.statusCode, message: result.message });
  }
}

export const token = (req, res) => {
  const username = req.body.username
  const refreshToken = req.body.refreshToken
  if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
    const user = {
      'username': username,
      'role': 'admin'
    }
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: 300 })
    res.json({ token: 'JWT ' + token })
  }
  else {
    res.send(statusCode.unauthorized);
  }
}

export const tokenReject = async (req, res) => {
  const result = await tokenService.tokenReject(req.body.refreshToken);

  setResponse(res, { statusCode: result.statusCode, message: result.message });
}
