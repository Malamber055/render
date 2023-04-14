"use strict";
import mongoose, {PassportLocalSchema} from 'mongoose';
const Schema = mongoose.Schema;   //alias
import passportLocalMongoose from "passport-local-mongoose";
//https://mongoosejs.com/docs/typescript/schemas.html#:~:text=Mongoose%20schemas%20are%20how%20you,type%20from%20the%20schema%20definition.

const UserSchema : any =  new Schema(
    {
        DisplayName: String,
        EmailAddress: String,
        Username : String,
        Created : {
            type : Date,
            default : Date.now()
        },
        Updated: {
            type : Date,
            default: Date.now()
        }
    },
    {
        collection: "users"
    }
);

//https://www.npmjs.com/package/passport-local-mongoose
//UserSchema.plugin(passportLocalMongoose, {usernameField : "Username"});
UserSchema.plugin(passportLocalMongoose);

//const Model = mongoose.model("User", UserSchema as PassportLocalSchema);
const Model = mongoose.model("User", UserSchema);

declare global
{
    export type UserDocument = mongoose.Document &
        {
            //lowercase 'u'
            username : String
            EmailAddress : String,
            DisplayName : String
        }
}
export default Model;


