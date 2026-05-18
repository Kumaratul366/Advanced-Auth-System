import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import { AppData } from '../context/AppContext';
import api from '../ApiInterceptor';

const VerifyOtp = () => {
  
  const { setIsAuth, setUser } = AppData();
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    otp: ""
  });


  const handleChange = (e) =>{
      const {name, value} = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) =>{
      setBtnLoading(true);
      e.preventDefault();
      try {
        const email = localStorage.getItem("email");
        const { data } = await api.post("/api/verify-otp", {otp: formData.otp, email});

        toast.success(data.message);

        localStorage.removeItem("email");

        setFormData({
          otp: ""
        });

        setIsAuth(true);
        setUser(data.user);
        navigate("/");

      } catch (error) {
        toast.error(error.response.data.message);
      }finally{
        setBtnLoading(false);
      }

    };


  return (
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
      <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
    </div>

    <form className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit}>
      
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Verify OTP</h2>

      <div className="relative mb-4">
        <label htmlFor="otp" className="leading-7 text-sm text-gray-600">OTP</label>
        <input type="number" id="otp" name="otp" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.otp} onChange={handleChange} required />
      </div>

      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{btnLoading ?  "Submitting..." : "Submit"}</button>
     
      <Link to={"/login"} className="text-xs text-gray-500 mt-3">Back to login</Link>
    </form>
  </div>
</section>
  )
}

export default VerifyOtp