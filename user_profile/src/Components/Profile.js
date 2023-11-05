import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import jwt from "jsonwebtoken";
import axios from "axios";
import Navbar from './Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    const profileDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = jwt.decode(token);
          if (!user) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            // Token is valid, make the authorized request
            try {
              await axios.get("http://localhost:8080/profile",
                {
                  headers: {
                    Authorization : `Bearer ${token}`,
                  },
                }
              ).then((res)=>{
                const userdata = res.data.user;
                setName(userdata.name);
                setPhone(userdata.phone);
                setEmail(userdata.email);
              });
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    profileDetail();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-item-center">
        <div className='profile'>
          <div className="row">
            <ul className="col">
              <li className="row">
                <div className="col-3 text-end">
                  Name: 
                </div>
                <div className="col-9">
                  { name }          
                </div>
              </li>
              <li className="row">
                <div className="col-3 text-end">
                  Email: 
                </div>
                <div className="col-9">
                  { email }           
                </div>
              </li>
              <li className="row">
                <div className="col-3 text-end">
                  Phone:
                </div>
                <div className="col-9">
                  { phone }           
                </div>
              </li>
              <li className="row mt-4 text-end d-flex justify-content-center">
                <div className="col-4 btn btn-outline-danger">
                  <Link to="/logout" className="text-decoration-none text-dark fw-bolder"> Logout </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;