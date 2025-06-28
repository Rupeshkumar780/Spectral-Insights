import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Trending = () => {
  const { blogs } = useAuth();
  const sliderRef = useRef(null);

  // Duplicate blogs to simulate infinite scrolling
  const repeatedBlogs = blogs ? [...blogs, ...blogs] : [];

  useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return; // Prevent accessing null

  let animation;
  const scrollSpeed = 0.5;

  const scroll = () => {
    if (slider) {
      slider.scrollLeft += scrollSpeed;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }
    animation = requestAnimationFrame(scroll);
  };

  animation = requestAnimationFrame(scroll);

  // Pause/resume handlers
  const pauseScroll = () => cancelAnimationFrame(animation);
  const resumeScroll = () => (animation = requestAnimationFrame(scroll));

  // Add listeners
  slider.addEventListener("mouseenter", pauseScroll);
  slider.addEventListener("mouseleave", resumeScroll);
  slider.addEventListener("touchstart", pauseScroll);
  slider.addEventListener("touchend", resumeScroll);

  // Cleanup
  return () => {
    cancelAnimationFrame(animation);
    slider.removeEventListener("mouseenter", pauseScroll);
    slider.removeEventListener("mouseleave", resumeScroll);
    slider.removeEventListener("touchstart", pauseScroll);
    slider.removeEventListener("touchend", resumeScroll);
  };
}, [blogs]); // you can also add a condition to run only if blogs exists

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll space-x-4 scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
        }}
      >
        {repeatedBlogs.map((element, index) => (
          <div
            key={index}
            className="flex-none w-64 bg-white border border-gray-400 rounded-lg shadow-md"
          >
            <Link to={`/blog/${element._id}`}>
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt="blog"
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {element.category}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                <h1
                  className="text-lg font-bold mb-2 overflow-hidden text-ellipsis"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {element.title}
                </h1>
                <div className="flex items-center">
                  <img
                    src={element.adminPhoto}
                    alt="author_avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="ml-3 text-gray-400 text-sm">
                    {element.adminName}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
