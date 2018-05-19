import User from '../model/userModel';

User.sync({ force: process.env.DB_CREATE_WITH_FORCE }).then(() => {
  return User.create({
    userName: 'pawelh133',
    password: 'cwel123',
    isConfirmed: true
  });
});