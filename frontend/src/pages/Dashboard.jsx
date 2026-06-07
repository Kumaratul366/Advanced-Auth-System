import React from 'react'
import { useState } from 'react'
import api from '../ApiInterceptor';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Dashboard = () => {
  const [content, setContent] = useState("");
  async function fetchAdminData(){
    try {
      const {data} = await api.get(`/api/admin`, {
        withCredentials: true,
      });

      setContent(data.message);

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  useEffect(()=>{
    fetchAdminData();
  }, []);

  return( 
  <>
  {content && <div>{content}</div>}
  </>)
}

export default Dashboard