import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile} = useAuth();
  const navigateTo = useNavigate();
  
  const handleBlog = (e)=>  {
    if(profile?.user?.role === "admin"){
      navigateTo("/dashboard");
    }else{
      toast.error("Only admins can create a blog");
    }
  };
  
  return (
    <>
      <footer className="bg-gradient-to-b from-blue-50 to-gray-300 text-gray-700 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Explore */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/" className="hover-underline" >Home</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover-underline">Blogs</Link>
              </li>
              <li>
                <Link to="/creators" className="hover-underline">Creators</Link>
              </li>
              <li>
                <Link to="/about" className="hover-underline">About</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/register" className="hover-underline">Register</Link>
              </li>
              <li>
                <Link to="/login" className="hover-underline">Login</Link>
              </li>
              <li>
                <button onClick={handleBlog} className="hover-underline">Write a Blog</button>
              </li>
              {/* <li>
                <button className="hover-underline" >Support</button>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Legal</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to={"\service"} className="hover-underline" >Terms of Service</Link>
              </li>
              <li>
                <Link to={"\privacy"} className="hover-underline" >Privacy Policy</Link>
              </li>
              <li>
                <Link to={"\content-policy"} className="hover-underline" >Content Policy</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/contact" className="hover-underline">Contact</Link>
              </li>
              <li>
                <Link to={"/blogMission"} className="hover-underline"> Blog Mission</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-gray-300 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-lg font-semibold mb-2 md:mb-0">
            Spectral<span className="text-red-500"> Insights</span>
          </div>
          <p className="text-black text-sm mb-2 md:mb-0">
            &copy; {currentYear} Spectral Insights. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/Rupeshkumar780" target="_blank" rel="noreferrer">
              <FaGithub className="h-6 w-6 hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/rupesh-kumar-240437287/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="h-6 w-6 hover:text-blue-700 hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
