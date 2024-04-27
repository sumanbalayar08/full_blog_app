import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    new_password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsFormValid(e.target.form.checkValidity());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      console.log("Please fill the form")
    } else {
      try {
        const res=await axios.post("http://127.0.0.1:8000/reset", input);
        console.log(res.data)
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form
      className="flex items-center justify-center h-screen bg-sky-200"
      onClick={handleSubmit}
    >
      <div className="w-[50vh] shadow-md p-6 space-y-4 bg-white rounded-md">
        <div className="text-xl font-bold text-center">Reset Form</div>
        <div className="flex items-center justify-center">
          <input
            name="username"
            onChange={handleChange}
            placeholder="Enter the username"
            type="text"
            className="py-2 px-1 border-b-2 border-gray-400 border-solid"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            name="new_password"
            onChange={handleChange}
            placeholder="Enter the new Password"
            type="new_password"
            className="py-2 px-1 border-b-2 border-gray-400 border-solid"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="py-2 px-2 bg-sky-700 hover:bg-sky-800 text-white w-48"
            type="submit"
          >
            Update
          </button>
        </div>
        
      </div>
    </form>
  );
};

export default Login;