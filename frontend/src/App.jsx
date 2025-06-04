import React from 'react'
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Creators from "../src/pages/Creators";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import BlogMission from "../src/pages/BlogMission";
import AIGenerator from './components/AIGenerator';
import Detail from "./pages/Details";
import UpdateBlog from "../src/dashboard/UpdateBlog";
import TermsOfService from './Legal/TermsOfService';
import PrivacyPolicy from './Legal/PrivacyPolicy';
import ContentPolicy from './Legal/ContentPolicy';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation()
  {/* giving routes path where where we don't want to show our Navbar and Footer*/}
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(
    location.pathname
  );

  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated); // it is not using because every page refresh it was redirected to /login

  return (
    <div> 
      {!hideNavbarFooter && <Navbar/>}
     
      {/* Defining routes */}
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/blogs" element={ <Blogs/> } />
        <Route exact path="/about" element={ <About/> } />
        <Route exact path="/contact" element={ <Contact/> } />
        <Route exact path="/creators" element={ <Creators/> } />
        <Route exact path="/login" element={ <Login/> } />
        <Route exact path="/register" element={ <Register/> } />
        <Route exact path="/dashboard" element={ <Dashboard/> } />
        <Route path="/ai-generate" element={<AIGenerator />} />

         {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page Route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
       
        {/* Blog mission Route */}
        <Route exact path="/blogMission" element={<BlogMission />} />

        {/*Route for Legal Section of Footer */}
        <Route exact path="/service" element={<TermsOfService />} />
        <Route exact path="/privacy" element={<PrivacyPolicy />} />
        <Route exact path="/content-policy" element={<ContentPolicy />} />

        {/* Universal Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />

      {!hideNavbarFooter && <Footer/>}
    </div>
  )
}

export default App
