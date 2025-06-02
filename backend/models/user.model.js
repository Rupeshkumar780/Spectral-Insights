import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid e-mail"]
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    photo:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
    },
    password:{
        type:String,
        select:false,   // it will hide the password
        required:true,
        minLength:8
    },
    token:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const User = mongoose.model("User", userSchema)