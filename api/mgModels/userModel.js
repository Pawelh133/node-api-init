import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  surname: {
    type: String,
    required: 'Surname is required'
  },
  age: {
    type: Number,
    required: 'Surname is required'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['married', 'single', 'divorced']
    }],
    default: ['single']
  }
});

mongoose.model('Users', UserSchema);
