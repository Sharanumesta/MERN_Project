import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  useEffect( () => {
    const profileDetail = async () => {
      try{
        const token = localStorage.getItem('token');
        if(token){
          const user = jwt.decode(token);

          if(!user){
            localStorage.removeItem('token');
            navigate('/login');
          }else{
            // Token is valid, make the authorized request
            const response = await axios.get('http://localhost:8080/profile', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data);
          }
        }else{
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    profileDetail();
  }, [navigate]);

  return (
    <>
    <h1>
      Hello Profile
    </h1>
    </>
  )
}

export default Profile
