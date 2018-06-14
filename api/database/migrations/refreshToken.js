import RefreshToken from '../model/refreshToken';

RefreshToken.sync({force: process.env.DB_CREATE_WITH_FORCE});