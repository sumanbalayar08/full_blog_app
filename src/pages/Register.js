import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const navigate=useNavigate()

  const [isFormValid, setIsFormValid] = useState(false);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    setIsFormValid(e.target.form.checkValidity());
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!isFormValid) {
      console.log("Please fill the form")
    } else {
    try{
      const res=await axios.post('http://127.0.0.1:8000/register',input)
      navigate('/login')
      console.log(res.data)
    }catch(err){
      console.error(err);
    }
  }

  };

  return (
    <form className="flex items-center justify-center bg-sky-200 h-screen" onClick={handleSubmit}>
      <div className="w-[50vh] shadow-md p-6 space-y-4 bg-white rounded-md">
        <div className="text-xl font-bold text-center">Registration Form</div>
        <div className="flex items-center justify-center">
          <input
            onChange={handleChange}
            name="username"
            placeholder="Enter username"
            type="text"
            required
            className="py-2 px-1 border-b-2 border-gray-400 border-solid"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            onChange={handleChange}
            name="password"
            placeholder="Enter the Password"
            type="password"
            required
            className="py-2 px-1 border-b-2 border-gray-400 border-solid"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="py-2 px-2 bg-sky-700 hover:bg-sky-800 text-white w-48"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="flex justify-center text-sm space-x-1">
          <div>Dont have an account?</div>
          <div className="hover:underline">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;