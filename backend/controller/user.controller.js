import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js"

////  $$$  register code   $$$   ////
export const register = async(req, res) =>{
    try{    
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({message:"User Photo is required..."});        
        }
        //retrieving user photo and checking for proper format
        const { photo } = req.files;
        const allowedFormats = ["image/jpg", "image/png", "image/webp", "image/jpeg", "image/JPG", "image/PNG", "image/JPEG"];
        if(!allowedFormats.includes(photo.mimetype)){
            return res.status(400).json({message:"Invalid Photo Format. only jpg and png are allowed."});                
        }
        // checking whether all input fields are given or not
        const {email,name,password,phone,education,role} = req.body;
        if(!email || !name || !password || !phone || !education || !role || !photo){
            return res.status(400).json({message:"All fields are required..."});
        }
        // checking from database whether user has already registered with the given email or not
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists with this email."});
        }

        // Cloudinary upload
        const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath, 
        {
            folder: "user_photos",
        }
        );
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }
        // seccuring password from bcryptjs dependency
        const hashedPassword = await bcrypt.hash(password,10);
        // Storing in Database
        const newUser = new User ({
            email,
            name,
            password: hashedPassword,
            phone,
            education,
            role, 
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
        await newUser.save();
        
        // if user is registered successfully
        if(newUser){  
            const token = await createTokenAndSaveCookies(newUser._id, res);
            console.log("SignUp: ", token);
            res.status(201).json({message: "User Registered Successfully.", newUser, token: token});
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ error:"Internal Server error"});
    }
};

//----------------------------------------------------------//
// login code
export const login = async (req, res) => { 
    const { email,password, role} = req.body;
    try { 
        if (!email || ! password || !role) { 
           return res.status(400).json({message: "Please fill required fields" }); 
        } 
        const user = await User.findOne({ email }).select("+password"); 
        if (!user.password) { 
            return res.status(400).json({message: "Please Enter the password." }); 
        } 
        // checking whether the bcrypt password matches with given password
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!user || !isMatch) { 
            return res.status(400).json({message: "Invalid email or password" }); 
        } 
        if (user.role !== role) { 
            return res.status(400).json({message: `Given role ${role} not found` }); 
        } 

        const token = await createTokenAndSaveCookies(user._id, res); 
        console.log("Login: ", token);
        res.status(200).json({ 
            message: "User logged in successfully", 
            user: { 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role, 
            }, 
            token: token, 
        }); 
    } catch (error){
        console.log(error);
        return res.status(500).json({ error:"Internal Server error"});
    }
}

//----------------------------------------------------------//
// logout code
export const logout = (req, res) => {
    // we will clear the token from the response
    try{
        res.clearCookie("jwt");  
        res.status(200).json({message: "User Logged out successfully."});
    }catch (error){
        console.log(error);
        return res.status(500).json({ error:"Internal Server error"});
    }
}

//-----------------------------------------------------------//
// Function to access my profile
export const getMyProfile = async(req, res) => {
    const user = await req.user;
    res.status(200).json({ user });
}

// Function to access my all the Admins present in our Database
export const getAdmins = async(req, res) => {
    const admins = await User.find({role: "admin"});
    res.status(200).json({ admins });
}