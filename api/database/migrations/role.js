import Role from '../model/role';

Role.sync({force: process.env.DB_CREATE_WITH_FORCE});