import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
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
        const res=await axios.post("http://127.0.0.1:8000/login", input);
        console.log(res.data)
        localStorage.setItem('token',res.data.token);
        navigate("/");
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
        <div className="text-xl font-bold text-center">Login Form</div>
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
            name="password"
            onChange={handleChange}
            placeholder="Enter the Password"
            type="password"
            className="py-2 px-1 border-b-2 border-gray-400 border-solid"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="py-2 px-2 bg-sky-700 hover:bg-sky-800 text-white w-48"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center text-sm space-x-1">
          <div>Dont have an account?</div>
          <div className="hover:underline">
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="flex justify-center text-sm space-x-1">
          <div>Forgot Password?</div>
          <div className="hover:underline">
            <Link to="/reset">Reset Here</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;