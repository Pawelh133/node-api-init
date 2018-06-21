import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import setResponse from '../helpers/statusMessageHelper';
import * as authService from '../services/authService';
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
  // const user = {
  //   'username': username,
  //   'role': 'admin'
  // };

  const user = await authService.getUser(username);

  const token = jwt.sign(user, process.env.SECRET, { expiresIn: 300 })
  const refreshToken = randtoken.uid(256)
  refreshTokens[refreshToken] = username;
  res.json({ token: 'JWT ' + token, refreshToken: refreshToken })
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

export const tokenReject = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken]
  }

  res.send(statusCode.noContent);
}
