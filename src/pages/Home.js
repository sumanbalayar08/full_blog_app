import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Call the server to fetch the posts and store them into the state
    async function fetchData() {
      console.log(category)
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/getpost${category}`
        );
        console.log(data);
        setPosts(data.data.posts);
        setTimeout(() => {
          setLoading(false); // Set loading to false after a delay
        }, 1000);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setLoading(false); // Make sure to set loading to false even if there's an error
      }
    }
    
    fetchData();
  }, [category]);


  // Function to format the date in "MMM DD, YYYY" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex-1 py-[5%] px-[5%] gap-40">
  <div className="flex flex-col gap-4">
    <p className="text-2xl font-bold">Popular Categories</p>
    <div className="flex justify-between text-white font-bold">
      <Link to="/?category=art">
        <button className="bg-rose-400 px-8 py-2 rounded-md">Art</button>
      </Link>
      <Link to="/?category=science">
        <button className="bg-red-600 px-8 py-2 rounded-md">Science</button>
      </Link>
      <Link to="/?category=technology">
        <button className="bg-orange-800 px-8 py-2 rounded-md">
          Technology
        </button>
      </Link>
      <Link to="/?category=food">
        <button className="bg-green-600 px-8 py-2 rounded-md">Food</button>
      </Link>
      <Link to="/?category=sports">
        <button className="bg-yellow-600 px-8 py-2 rounded-md">Sports</button>
      </Link>
    </div>
  </div>

  {/* Apply margin or padding to create gap */}
  <div className="mt-10">
    {posts.length > 0 && (
      <div className="space-y-8">
        {posts.map((post, index) => (
          <div className="flex space-x-1 items-center" key={index}>
            <div className="flex-col space-y-5">
              <div className="flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-serif">{post.author}</p>
                  <span>•</span>
                  <p className="text-pink-600">
                    {formatDate(post.creation_date)}
                  </p>
                </div>

                <div className="font-bold text-xl">
                  <Link to={`/getpost/${post.id}`}>{post.title}</Link>
                </div>

                <p>{post.content.substring(0, 300)}...</p>
              </div>

              <ul className="flex space-x-4">
                {post.tags.map((tag, tagIndex) => (
                  <li
                    className="bg-gray-300 rounded-md px-2"
                    key={tagIndex}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default Home;
