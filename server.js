import mongoose from 'mongoose';
import express from 'express';
import userModel from './api/models/userModel';
import bodyParser from 'body-parser';
import routes from './api/routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);