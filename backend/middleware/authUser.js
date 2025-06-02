import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

// Authentication to create Blog
export const isAuthenticated = async(req,res,next) => {
    try{
        const token = await req.cookies.jwt;
        console.log("MiddleWare: ", token);
        if(!token){
            return res.status(401).json({error: "User is not Authenticated."});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({error: "user not found"});            
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error occuring in Authentication: "+error);
        return res.status(401).json({error: "User is not Authenticated."});
    }
}

////-----------------------------------------------------------////
// Authorization for Admin
export const isAdmin = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res
            .status(403)
            .json({error: `${req.user.role} role is not allowed to create blog.`});            
        }
        next();
    };
};
