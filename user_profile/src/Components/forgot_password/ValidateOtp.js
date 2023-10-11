import React, { useState } from 'react'
import * as yup from "yup";
import { Formik } from "formik";
import axios from 'axios';
import UpdatePassword from './UpdatePassword';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ValidateOtp = (props) => {
  const email = props.data;
  const message = email.message;
  const navigat = useNavigate();

  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const initialValues = {
    otp: ''
  }

  const otpSchema = yup.object().shape({
    otp: yup.number()
        .required("Enter the otp")
        .test(
            "is-six-digits",
            "OTP must be exactly 6 digits",
            (value) => (value ? /^[0-9]{6}$/.test(value) : false)
        ),
  });

  const handleSubmit = async (values) => {
    try {
        const dataToSend = {
            ...values,
            email: email,
        }
        axios.post("http://localhost:8080/validat_otp", dataToSend)
        .then((res) => {
            if(res.data.message === 'Otp successfully validated'){
                if(res.data.otpName){
                    Swal.fire({
                        icon:"success",
                        title: "Succesfull",
                        text: 'Email verificartion successfull'
                    })
                    .then((result) =>{
                        if(result.isConfirmed){
                            navigat('/')
                        }
                    });
                }else{
                    setPasswordUpdate(true);
                }
            }else if(res.data.message === 'Invalid OTP'){
                Swal.fire({
                    icon: 'error',
                    title: "Incorrect OTP",
                    text: 'Check your email and enter correct OTP'
                });
            }
        });
    } catch (error) {
        console.error("Error:", error);
    }
  }

  return (
    <>
        {
            passwordUpdate ? (
                <UpdatePassword data={email} />
            ) : (
                <div className="background">
                    <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="row w-75">
                        <div className="col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3">
                        <div className="">
                        <Formik
                            className="bg-white"
                            initialValues={initialValues}
                            validationSchema={otpSchema}
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
                                <div className="h6 text-uppercase text-success py-4 text-center">
                                    { message ? ( message ) : ( "enter the otp send to yor email" ) }
                                </div>
                                <div className="pb-3 row position-relative password-toggle-container">
                                    <input
                                    className="inputField"
                                    type="number"
                                    name="otp"
                                    autoComplete="off"
                                    placeholder="Enter OTP"
                                    value={values.otp}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {errors.otp && (
                                    <div
                                        className="text-danger"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        {errors.otp}
                                    </div>
                                    )}
                                </div>
                                <div className="text-center pt-3 pb-5">
                                    <button
                                    type="submit"
                                    className="input-button btn btn-primary"
                                    >
                                    Enter
                                    </button>
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
  )
}

export default ValidateOtp