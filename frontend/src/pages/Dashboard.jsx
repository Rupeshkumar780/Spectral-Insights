import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/SideBar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sm:w-45 ">
        <Sidebar setComponent={setComponent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-20 lg:ml-15 sidebar-narrow p-4 mt-16 sm:mt-0 sm:p-8">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
