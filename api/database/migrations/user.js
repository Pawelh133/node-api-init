import User from '../model/userModel';

User.sync({ force: process.env.DB_CREATE_WITH_FORCE }).then(() => {
  return User.create({
    firstName: 'Johngdfgdf',
    lastName: 'Hancock',
    cwel: 'dupa'
  })
});