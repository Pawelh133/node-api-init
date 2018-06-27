import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import models from '../database/migrations';
import statusCode from '../constants/statusCode';

export const assignUserRefreshToken = async (user) => {
  try {
    const userRefrshToken = await models.RefreshTokens.findOne({
      where: { userId: user.id },
      attributes: ['userId', 'refreshToken'],
    }, { rejectIfEmpty: false });
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    if (userRefrshToken) {
      return {
        success: true,
        statusCode: statusCode.ok,
        token: token,
        refreshToken: userRefrshToken.dataValues.refreshToken
      }
    }
    else {
      const refreshToken = await randtoken.uid(256);
      const expiresIn = new Date();

      await models.RefreshTokens.create({
        userId: user.id,
        refreshToken: refreshToken,
        expiresIn: expiresIn.setMonth(expiresIn.getMonth() + 1)
      });

      return { success: true, token: token, refreshToken: refreshToken, expiresIn: process.env.TOKEN_EXPIRES_IN }
    }
  } catch (e) {
    return { success: false, statusCode: statusCode.error, message: 'error occured during saving refresh token' }
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

