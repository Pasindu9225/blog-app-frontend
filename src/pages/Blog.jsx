import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../api/internal";
import Loader from "../components/Loader";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Delay the fetch by 2 seconds (2000 milliseconds)
        setTimeout(async () => {
          const response = await getAllBlogs();
          if (response.status === 200) {
            setBlogs(response.data.blogs);
            console.log("all blogs", response.data.blogs);
            setLoading(false); // Update loading state after fetching data
          } else {
            console.error("Failed to fetch blogs:", response.statusText);
          }
        }, 2000);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        setLoading(false); // Update loading state in case of error
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader text={"blogs"} />;
  }

  return (
    <section className="max_padd_container flex flex-col justify-center pt-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col p-4 bg-slate-500/5 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <img
              src={blog.photoPath}
              alt={`Thumbnail for ${blog.title}`}
              className="block object-cover w-full rounded-2xl h-44 bg-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-image-url.jpg"; // Fallback image URL
              }}
            />
            <h4 className="text-left mt-4 bold-16 line-clamp-2 text-[#333]">
              {blog.title}
            </h4>
            <p className="line-clamp-3 mt-2 text-left">{blog.content}</p>
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={() => navigate(`/blog/${blog._id}`)}
              aria-label={`Read more about ${blog.title}`}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
