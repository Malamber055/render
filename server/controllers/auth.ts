import express, {Request, Response, NextFunction} from "express";
import {GenerateToken, UserDisplayName} from "../util";
import passport from "passport";
import User from "../models/user";

//Display Pages
export function DisplayLoginPage(req : Request, res : Response , next: NextFunction) : void
{
    if(!req.user) {
        return res.render('index', {title: 'Login', page: 'login',
            messages: req.flash('loginMessage'), displayName : UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req : Request, res : Response , next: NextFunction) : void
{
    if(!req.user) {
        return res.render('index', {title: 'Register', page: 'register',
            messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
    }
    return res.redirect("/contact-list");
}

//Process Pages
export function ProcessLoginPage(req : Request, res : Response , next: NextFunction) : void
{
    passport.authenticate('local', function(err : Error, user : Express.User, info : string) {

        //are there server errors?
        if(err){
            console.error(err);
            res.end(err);
        }

        // are their login errors
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.logIn(user, function(err)
        {
            if(err){
                console.error(err);
                res.end(err);
            }

            //generate jwt
            const authToken = GenerateToken(user);
            console.log(authToken);

            res.redirect('/contact-list')
        });

    })(req, res, next);

}

export function ProcessRegisterPage(req : Request, res : Response , next: NextFunction) : void
{
//instantiate a new user object
    //https://www.npmjs.com/package/passport-local-mongoose
    let newUser = new User ({
        username : req.body.username,
        EmailAddress : req.body.emailAddress,
        DisplayName : req.body.firstName + " " + req.body.lastName
    });

    console.log("password:" + req.body.password);
    User.register(newUser, req.body.password, function(err){
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('Error: User Already Exists');
                req.flash('registerMessage', 'Registration Error');
            }
            console.error(err.name);  //other error
            req.flash('registerMessage', 'Server Error');
            res.redirect('/register');

        }

        //automatically login the user
        return  passport.authenticate('local')(req, res, function(){
            return res.redirect('/contact-list');
        });

    });


}

export function ProcessLogoutPage(req : Request, res : Response , next: NextFunction) : void
{
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
    });
}