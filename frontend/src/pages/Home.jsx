import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { server } from '../main'
import { AppData } from '../context/AppContext'
import api from '../ApiInterceptor'
import { Link } from 'react-router-dom'


const Home = () => {

  const { setIsAuth, setUser } = AppData();

  const handleLogout = async()=>{
    try {
      const {data} = await api.post("api/logout")
      toast.success(data.message)
      setIsAuth(false);
      setUser(null);

    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const {user} = AppData()

  return (
    <div className='w-25 flex m-auto mt-40'>
      <button className='bg-red-500 text-2xl text-white p-2 rounded-2xl' onClick={handleLogout}>Logout</button>


      {user && user.role === "admin" && (
        <Link to="/dashboard" className='bg-purple-500 text-white p-2 rounded-md'>Dashboard</Link>
      )}


    </div>
  )
}

export default Home