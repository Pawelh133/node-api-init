import "babel-polyfill";
import express from 'express';
import dotenv from 'dotenv/config';
import passportRegister from './register/passportRegister';
import bodyParser from 'body-parser';
import mongoseRegister from './register/mongoRegister';
import sequelizeRegister from './register/sequelizeRegister';
import routes from './routes';
import validate from 'express-validation';
import passport from 'passport';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize())
app.use(passport.session())

routes(app); //register the route

app.listen(port);
// app.use(compression())

console.log('todo list RESTful API server started on: ' + port);