import React, { useEffect } from 'react'
// import jwt from 'jsonwebtoken';
import axios from 'axios';

const Profile = () => {
//   const navigate = useNavigate();

//   useEffect( () => {
//     const profileDetail = async () => {
//       try{
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });
//         console.log(response.data);
//       }catch(error){
//         console.log(error);
//       }
//     };
    
//     const token = localStorage.getItem('token');
//     if(token){
//       const user = jwt.decode(token);
//       if(!user){
//         localStorage.removeItem('token');
//         navigate('/login');
//       }else{
//         profileDetail();
//       }
//     }else{
//       navigate('/login');
//     }
//   })[navigate];

  return (
    <>
    <h1>
      Hello Profile
    </h1>
    </>
  )
}

export default Profile
