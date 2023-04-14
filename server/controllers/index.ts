import express, {Request, Response, NextFunction} from "express";
import {UserDisplayName} from "../util";

export function DisplayHomePage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'Home', page : 'home', displayName : UserDisplayName(req)  });
}

export function DisplayAboutUsPage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'About Us', page : 'about', displayName : UserDisplayName(req)  });
}

export function DisplayServicesPage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'Services', page : 'services', displayName : UserDisplayName(req)  });
}

export function DisplayProductsPage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'Our Products', page : 'products', displayName : UserDisplayName(req)  });
}

export function DisplayContactPage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'Contact Us', page : 'contact', displayName : UserDisplayName(req)  });
}