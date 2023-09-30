import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import Swal from "sweetalert2";
import ValidateOtp from "./ValidateOtp";

const ForgotPassword = () => {

  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [email, setEmail] = useState();

  const initialValues = {
      email: "",
    };
  
  const emailSchema = yup.object().shape({
    email: yup.string().email().required("Enter your email")
  });
  
  useEffect(() => {
  },[email]);

  const handleSubmit = async (values) => {
    try {
        axios.post("http://localhost:8080/forgot_password", values)
            .then((res) => {
              if(res.data.message === 'User not found'){
                Swal.fire(
                  'User not found',
                  'Please check your email',
                  'error'
                ).then(() => {
                  window.location.reload();
                })
              }else if (res.data.message === 'OTP sent successfully'){
                Swal.fire(
                  'OTP sent',
                  'Please check your email',
                  'success'
                ).then(() => {
                  setPasswordUpdate(true);
                  setEmail(values.email);
                })
              }
            })
    } catch (error) {
        
    }
  }

  return (
    <>
    <div className="background">
      {
      passwordUpdate ? (
        <ValidateOtp data={email}/>
      ) : (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="row w-75">
            <div className="col-md-6 mx-auto  border-0 shadow-lg bg-white rounded-3">
              <Formik
                initialValues={initialValues}
                validationSchema={emailSchema}
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
                    <div className="h6 text-success text-uppercase py-4 text-center">
                      Enter your email to get otp
                    </div>
                    <div className="pb-3 px-5 row">
                      <input
                        className="inputField "
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
                    <div className="text-center pt-3 pb-4 ">
                      <button
                        type="submit"
                        className="input-button btn btn-primary"
                      >
                        Get OTP
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
export default ForgotPassword