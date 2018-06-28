import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import models from '../database/migrations';
import statusCode from '../constants/statusCode';
import * as roleService from './roleService';

const createRefreshToken = () => randtoken.uid(256);

const getRefreshTokenExpiration = (months = 1) => {
  let currentDateTime = new Date();
  return currentDateTime.setMonth(currentDateTime.getMonth() + months);
}

export const assignUserRefreshToken = async (user, roles) => {
  try {
    const userRefrshToken = await models.RefreshTokens.findOne({
      where: { userId: user.id },
    }, { rejectIfEmpty: false });

    const token = jwt.sign({
      username: user.userName,
      roles: roles
    },
      process.env.SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    );

    const newRefreshToken = createRefreshToken();

    if (userRefrshToken) {
      await userRefrshToken.updateAttributes({
        refreshToken: newRefreshToken,
        expiresIn: getRefreshTokenExpiration()
      });

      return {
        success: true,
        statusCode: statusCode.ok,
        token: token,
        refreshToken: newRefreshToken
      }
    }
    else {
      const refreshToken = createRefreshToken();
      const expiresIn = getRefreshTokenExpiration();

      await models.RefreshTokens.create({
        userId: userId,
        refreshToken: refreshToken,
        expiresIn: expiresIn
      });

      return { success: true, token: token, refreshToken: refreshToken, expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: 'error occured during saving refresh token' }
  }
}

export const generateToken = async (userName, refreshToken) => {
  try {
    const refreshTokenResult = await models.RefreshTokens.findOne({
      where: {
        refreshToken: refreshToken,
      },
      include: {
        model: models.User,
        where: {
          userName: userName,
        },
        attributes: ['userName'],
      }
    }, { rejectIfEmpty: false });

    if (refreshTokenResult) {
      const userName = refreshTokenResult.user.dataValues.userName;
      const user = {
        'username': userName,
        'role': await roleService.getUserRoles(userName)
      }
      const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME;
      const newRefreshToken = createRefreshToken();

      await refreshTokenResult.updateAttributes({
        refreshToken: newRefreshToken,
        expiresIn: getRefreshTokenExpiration()
      });

      return {
        success: true,
        statusCode: statusCode.ok,
        token: jwt.sign(user, process.env.SECRET, { expiresIn: tokenExpirationTime }),
        refreshToken: newRefreshToken,
        expiresIn: tokenExpirationTime
      }
    }
    else {
      return { success: false, statusCode: statusCode.notFound }
    }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: 'error ocured during token generation' }
  }
}

export const tokenReject = async (refreshToken) => {
  try {
    const refreshTokenResult = await models.RefreshTokens.findOne({
      where: {
        refreshToken: refreshToken
      }
    }, { rejectIfEmpty: false });
    const tmp = refreshTokenResult;
    if (refreshTokenResult) {
      const ttt = refreshTokenResult;
      await refreshTokenResult.destroy();
    }

    return { success: true, statusCode: statusCode.noContent }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: 'error occured during removeing refresh token' }
  }
}
