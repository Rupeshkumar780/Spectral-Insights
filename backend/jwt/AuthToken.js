// jsonwebtoken is used to secure data and to authentic user.
// when user login a unique token will be generated, 
// when user have the token then only he can visit the claimed page

import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const createTokenAndSaveCookies = async(userId,res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        httpOnly: true,  //xss
        secure: true,
        sameSite: "lax",  // csrf
        path: "/", // Ensure the cookie is available throughout the site

    })
    await User.findByIdAndUpdate(userId,{ token })
    return token;
}

export default createTokenAndSaveCookies;