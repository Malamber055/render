import express, {Request, Response, NextFunction} from "express";
import Contact from "../models/contact";
import {UserDisplayName} from "../util";
import contact from "../models/contact";


//Display Page Functions
export function DisplayContactListPage(req : Request, res : Response , next: NextFunction) : void
{
    Contact.find().then(function (data){
        //console.log(data);
        res.render('index', { title: 'Contact List', page : 'contact-list',
            contacts : data, displayName : UserDisplayName(req)  });
    }).catch(function(err){
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
}

export function DisplayAddPage(req : Request, res : Response , next: NextFunction) : void
{
    res.render('index', { title: 'Add', page : 'edit', contact : '', displayName : UserDisplayName(req)  });
}

export function DisplayEditPage(req : Request, res : Response , next: NextFunction) : void
{
    //this is obtained from the passed in :id
    let id = req.params.id;

    Contact.findById(id).then(function(contactToEdit) {
        //pass the id to the db and read/obtain the contact
        res.render('index', { title: 'Edit', page : 'edit',
            contact : contactToEdit, displayName : UserDisplayName(req)  });

    }).catch(function(err){
        console.error(err);
        res.end(err);
    })
}


//Process Page Functions
export function ProcessAddPage(req : Request, res : Response , next: NextFunction) : void
{
//instantiate a new contact
    let newContact = new Contact (
        {
            "FullName" : req.body.fullName,
            "ContactNumber" : req.body.contactNumber,
            "EmailAddress" : req.body.emailAddress
        }
    );

    //insert contact in database
    Contact.create(newContact).then(function(){

        //new Contact has been added successfully
        res.redirect('/contact-list');

    }).catch(function(err){
        console.error(err);
        res.end(err)
    })



}

export function ProcessEditPage(req : Request, res : Response , next: NextFunction) : void
{
    let id = req.params.id;

    //instantiate a new contact
    let updatedContact = new Contact (
        {
            "_id" : id,
            "FullName" : req.body.fullName,
            "ContactNumber" : req.body.contactNumber,
            "EmailAddress" : req.body.emailAddress
        }
    );

    //insert contact in database
    Contact.updateOne({_id : id}, updatedContact).then(function(){

        //edit Contact was successful
        res.redirect('/contact-list');

    }).catch(function(err){
        console.error(err);
        res.end(err)
    })


}

export function ProcessDeletePage(req : Request, res : Response , next: NextFunction) : void
{
    //this is obtained from the passed in :id
    let id = req.params.id;

    Contact.deleteOne({_id : id}).then(function() {
        res.redirect("/contact-list")
    }).catch(function(err){
        console.error(err);
        res.end(err);
    })
}
