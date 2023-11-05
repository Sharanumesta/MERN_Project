import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Enter your Email"),
    password: yup.string().required("Enter yor Password"),
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:8080/login", values).then((res) => {
        const { message, token } = res.data;
        if (message === "Login successful") {
          Swal.fire({
            title:'Login Successfull',
            icon:'success'
          }).then(()=>{
            localStorage.setItem("token", token);
            navigate("/");
          })
        } else{
          setError("Incorrect email or password");
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState("password");
  const passwordToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <>
      <div className="background">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="row w-75">
            <div className="col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3">
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <form className="mx-auto" onSubmit={handleSubmit}>
                    <div className="h3 text-uppercase text-success py-5 text-center">
                      Welcome Back
                    </div>
                    <div className="pb-3 px-5 row">
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
                    <div className="pb-3 px-5 row position-relative">
                      <input
                        className="inputField pr-5"
                        type={type}
                        name="password"
                        autoComplete="off"
                        placeholder="Password"
                        value={values.Password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div>
                          <FontAwesomeIcon
                            onClick={passwordToggle}
                            icon={icon}
                            className="togglePassword"
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
                    {error && (
                      <div
                        className="text-danger text-center"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {error}
                      </div>
                    )}
                    <div className="text-center pt-3 pb-4 ">
                      <button
                        type="submit"
                        className="input-button btn btn-primary"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center mb-2">
                      <Link to='/forgot_password' className="text-decoration-none text-success"> forgot password?</Link>
                    </div>
                    <div className="text-center">
                      <p>don't have an account? <Link to='/registration' className="text-decoration-none text-success">Register</Link></p>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;