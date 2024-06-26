import React, { useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ValidateOtp from "./forgot_password/ValidateOtp";

const Registration = () => {
  const [email, setEmail] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const message = {
    message : 'Enter the email verification code sent to your email',
    email : email
  };
  const registrationSchema = yup.object().shape({
    name: yup.string().min(3).max(20).required("Enter your name"),
    email: yup.string().email().required("Enter your email"),
    phone: yup.string().required().matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: yup.string().required("Enter your Password"),
    confirm_password: yup.string().required().oneOf([yup.ref("password"), null], "Password must match"),
  });

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token){
      navigate('/login');
    }
  },[token])

  const handleSubmit = async (values) => {
    try {
      setEmail(values.email);
      await axios.post("http://localhost:8080/registration", values)
      .then((res) => {
        if (res.data.message === 'User already exists') {
          Swal.fire({
            title:'User already exists',
            icon:"info",
            text:"Please login"
          }).then((result) =>{
            if(result.isConfirmed){
              navigate("/login");
            }
          })
        }else if (res.data.message === "OTP sent successfully"){
          setEmailVerification(true);
        }else if (res.status === 200) {
          Swal.fire({
            title:'Registration successful',
            icon:'success'
          }).then((result) =>{
            if(result.isConfirmed){
              navigate("/login");
            }
          })
        } else {
          Promise.reject();
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const passwordTogle = () => {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  };
  return (
    <>
      {
        emailVerification ? (
          <ValidateOtp data={message}/>
        ) : (
          <div className="background">
            <div className="container d-flex justify-content-center align-items-center vh-100">
              <div className="row w-75">
                <div className="col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3">
                  <div className="">
                    <Formik
                      className="bg-white"
                      initialValues={initialValues}
                      validationSchema={registrationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        values,
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <form className="mx-5" onSubmit={handleSubmit}>
                          <div className="h3 text-uppercase text-success py-4 text-center">
                            Registration
                          </div>
                          <div className="pb-3 row">
                            <input
                              className=" inputField"
                              type="text"
                              name="name"
                              autoComplete="off"
                              placeholder="Name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.name && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div className="pb-3 row">
                            <input
                              className="inputField"
                              type="tel"
                              name="phone"
                              autoComplete="off"
                              placeholder="Phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.phone && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {errors.phone}
                              </div>
                            )}
                          </div>
                          <div className="pb-3 row">
                            <input
                              className="inputField"
                              type="email"
                              name="email"
                              autoComplete="off"
                              placeholder="Email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className="pb-3 row position-relative password-toggle-container">
                            <input
                              className="inputField"
                              type={type}
                              name="password"
                              autoComplete="off"
                              placeholder="Password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div> 
                              <FontAwesomeIcon
                                onClick={passwordTogle}
                                icon={icon}
                                className="eye-icon"
                              />
                            </div>
                            {errors.password && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="pb-3 row position-relative password-toggle-container">
                            <input
                              className="inputField password-input"
                              type={type}
                              name="confirm_password"
                              autoComplete="off"
                              placeholder="Confirm password"
                              value={values.confirm_password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div>
                              <FontAwesomeIcon
                                onClick={passwordTogle}
                                icon={icon}
                                className="eye-icon"
                              />
                            </div>
                            {errors.confirm_password && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {errors.confirm_password}
                              </div>
                            )}
                          </div>
                          <div className="text-center pt-3 pb-3">
                            <button
                              type="submit"
                              className="input-button btn btn-primary"
                            >
                              Register
                            </button>
                          </div>
                            <div className="text-center">
                            <p>already have an account? <Link to='/login' className="text-decoration-none text-success">Login</Link></p>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Registration;