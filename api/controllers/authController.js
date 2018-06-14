import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import setResponse from '../helpers/statusMessageHelper';
import * as authService from '../services/authService';

let refreshTokens = {};

export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      setResponse({
        statusCode: 400,
        message: 'username nie może być pusty'
      });

      return;
    }

    if (password.length < process.env.MIN_PASSWORD_LENGTH) {
      setResponse({
        statusCode: 400,
        message: `hasło musi zawierać przynajmniej ${process.env.MIN_PASSWORD_LENGTH} znaki.`
      });

      return;
    }

    const response = await authService.register(username, password);
    if (response.success === true) {
      setResponse(res, response);
    }
    else {
      setResponse(res, response);
    }
  }
  catch (e) {
    setResponse(res, { statusCode: 500, message: e.message });
  }
}

export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {
    'username': username,
    'role': 'admin'
  };

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
    res.send(401)
  }
}

export const tokenReject = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken]
  }

  res.send(204);
}
