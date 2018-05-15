import mongoose from 'mongoose';
import _ from 'lodash';
const Users = mongoose.model('Users');

export const listUsers = (req, res) => {
  Users.find({}, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
};

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
