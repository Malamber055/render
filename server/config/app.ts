import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from '../routes/index';
import authRouter from '../routes/auth';
import contactListRouter from '../routes/contact-list';
//import usersRouter from '../routes/users';

import session from "express-session";         //cookie-based session
import passport from "passport";               //authentication support
import passportLocal from "passport-local";    //authentication strategy (username / password)
import flash from 'connect-flash'              //authentication messaging - holds messaging for authentication

//modules to support authentication
import cors from 'cors';
import passportJWT from 'passport-jwt';

//JWT Aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let localStrategy = passportLocal.Strategy;  //alias

import User from '../models/user'

const app = express();

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

//setup cors
app.use(cors());

app.use(session ({
  secret : DBConfig.SessionSecret,
  saveUninitialized: false,
  resave: false
}))

//initialize flash
app.use(flash());
//initialize flash
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

//serialize and deserialize user data
passport.serializeUser(User.serializeUser());    // *** HACK!!!!!!! ***
passport.deserializeUser(User.deserializeUser());

//JWT Options
let jwtOptions =
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: DBConfig.SessionSecret
}

//define our JWT Strategy
//http://www.passportjs.org/packages/passport-jwt/
let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done)
{
  User.find({id: jwt_payload.sub}).then(function (user : any){
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  }).catch(function(err){
    if (err) {
      return done(err, false);
    }
  });

});

passport.use(strategy);

//Route Declarations
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', contactListRouter);
//app.use('/users', usersRouter);

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
  //res.render('error');

  res.render('error', {message : err.message, error: err, title : '', page : '', displayName : '' });

});

export default app;
