import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from '../routes';
import usersRouter from '../routes/users';

// SERGIO SANTILLI - modules for authentication
import session from "express-session";         //cookie-based session
import passport from "passport";               //authentication support
import passportLocal from "passport-local";    //authentication strategy (username / password)
import flash from 'connect-flash'              //authentication messaging - holds messaging for authentication

// SERGIO SANTILLI - authentication Model and Strategy Alias
let localStrategy = passportLocal.Strategy;  //alias

// SERGIO SANTILLI - User Model
import User from '../models/user'

const app = express();

//*** SERGIO SANTILLI - db configuration ***
import * as DBConfig from './db';
//mongoose.connect(DBConfig.LocalURI);
mongoose.connect(DBConfig.RemoteURI);
const db = mongoose.connection;
db.on("error", function() {
  console.error("Connection Error!");
});
db.once("open", function (){
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});
//*** SERGIO SANTILLI END ***

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//UPDATED/ADDED --SERGIO SANTILLI
app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//SERGIO SANTILI - express session
app.use(session ({
  secret : DBConfig.SessionSecret,
  saveUninitialized: false,
  resave: false
}))

//SERGIO SANTILLI - DO BEFORE ROUTE DECLARATION
//initialize flash
app.use(flash());
//initialize flash
app.use(passport.initialize());
app.use(passport.session());

//SERGIO SANTILLI - Implement an Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize user data
passport.serializeUser(User.serializeUser());    // *** HACK!!!!!!! ***
passport.deserializeUser(User.deserializeUser());

//Route Declarations
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request,
                            res : express.Response, next : NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
