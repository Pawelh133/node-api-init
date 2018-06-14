import User from '../model/user';

User.sync({ force: process.env.DB_CREATE_WITH_FORCE }).then(() => {
  // return User.create({
  //   userName: 'pawelh133',
  //   password: '',
  //   salt: '',
  //   isConfirmed: true
  // });
});

