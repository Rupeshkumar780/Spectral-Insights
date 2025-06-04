import express from 'express';

import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import userRoute from "./routes/user.routes.js";
import blogRoute from "./routes/blog.route.js";
import aiRoutes from "./routes/aiRoutes.js"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;
 
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
    })
);

app.use(fileUpload({
   useTempFiles: true,
   tempFileDir: "/tmp/",
}));

// DB Code 
try{
    mongoose.connect(MONGO_URL)
    console.log("Connected to mongoDB");
}catch(error){
    console.log(error);
}
// defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/ai", aiRoutes);

// Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.API_SECRET_KEY ,
    secure: true  // This forces HTTPS for all URLs
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`)
})
