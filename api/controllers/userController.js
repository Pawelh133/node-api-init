import mongoose from 'mongoose';
const Users = mongoose.model('Users');

import User from '../database/model/user';

//mysql
export const listUsers = (req, res) => {
  User.findAll().then((users, err) => {
    if (err)
      res.send(err);
    res.json(users);
  });
};

//Mongo
export const createUser = (req, res) => {
  const new_user = new Users(req.body);
  new_user.save((err, user) => {
    err ? res.send(err) : res.json(user);
  });
};

export const getUserById = (req, res) => {

  try {
    Users.findById(req.params.userId, (err, user) => {
      if (err) res.send(err);
      user ? res.json(user) : res.sendStatus(404);
    });
  }
  catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const updateUser = (req, res) => {
  Users.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};

export const deleteUser = (req, res) => {
  Users.remove({
    _id: req.params.userId
  }, (err, user) => {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
