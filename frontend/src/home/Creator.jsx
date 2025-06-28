import axios from "axios";
import { useEffect, useState } from "react";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Creator = () => {
  const [admin, setAdmin] = useState([]);
  console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/admins`,
          {
            withCredentials: true,
          }
        );
        console.log(data.admins);
        setAdmin(data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Popular Creators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id} className="flex flex-col items-center hover:scale-95 transition-transform duration-300">
              <img
                src={element.photo?.url}
                alt={element.name}
                className="w-40 h-40 object-cover border border-gray-300 rounded-full mb-4 shadow-lg shadow-cyan-300 hover:shadow-2xl hover:shadow-cyan-500"
              />
              <div className="text-center">
                <p className="text-lg font-medium">{element.name}</p>
                <p className="text-sm text-gray-600">{element.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No creators found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Creator;
