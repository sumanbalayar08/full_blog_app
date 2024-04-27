import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import moment from "moment";

const Single = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // To store new comment text
  const isAuthenticated=localStorage.getItem('token');

  const navigate = useNavigate();
  // Fetch the single blog post
  useEffect(() => {
    async function fetchData() {
      console.log(postId);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/getpost/${postId}`
      );
      console.log(data);
      setPost(data.post);
      console.log(data.post.title);
      console.log(data.post.user?.username);
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/getcomment/${postId}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
    fetchComments();
  }, [postId]);

  const deletePost = async () => {
    await axios.delete(`http://127.0.0.1:8000/delete/${postId}`);
    navigate("/");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  
  const handleCommentSubmit = async () => {
    try {
      // Send a request to add a new comment
      const response = await axios.post(
        `http://127.0.0.1:8000/addcomment/${postId}`,
        {
          text: newComment,
        }
      );
      // Assuming the server responds with the newly added comment
      const newCommentData = response.data;
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(""); // Clear the comment input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex-col justify-evenly py-[5%] px-[2%]">
      <div className="flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-col">
            <span className="font-bold text-lg">{post.author}</span>
            <p className="text-sm font-serif">
              {formatDate(post.creation_date)}
            </p>
          </div>
          <div className="flex">
            <div
              className="bg-red-600 rounded-full px-2 py-2 cursor-pointer"
              onClick={deletePost}
            >
              <MdDelete size={15} fill="white" />
            </div>
          </div>
        </div>
        <div className="w-[100vh]">
          <h2 className="font-bold text-2xl">{post.title}</h2>
          <p className="font-sans justify-center">{post.content}</p>
        </div>
      </div>

      {/* Display comments */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Comments</h3>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="space-y-2">
              <p className="bg-gray-600 text-white rounded-md">
                {comment.text}
              </p>
            </li>
          ))}
        </ul>
        {isAuthenticated ? (
       <form
          onSubmit={handleCommentSubmit}
          className="flex items-center space-x-4"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border-slate-400 border-4"
          />
          <button
            type="submit"
            className="bg-green-500 border-3 px-2 py-1 rounded-md"
          >
            Add Comment
          </button>
        </form>
      ) : (
        <div>
          <p>Please log in to leave a comment.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Single;
