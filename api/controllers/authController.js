import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';

let refreshTokens = {};

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
