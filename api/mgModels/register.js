import mongoose from 'mongoose';
import userModel from '../mgModels/userModel';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_MG_HOST);