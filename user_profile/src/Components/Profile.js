import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";

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
      <h1>Profile</h1>
        <ul>
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
        </ul>
          <Link to="/mail" className="btn input-button btn-outline-primary text-center"> Send mail </Link>

    </>
  );
};

export default Profile;