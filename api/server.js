import express from 'express';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';
import mongoseRegister from './mgModels/register';
import sequelizeRegister from './database/sequelizeRegister';
import routes from './routes';
import validate from 'express-validation';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.listen(port);
// app.use(compression())

console.log('todo list RESTful API server started on: ' + port);