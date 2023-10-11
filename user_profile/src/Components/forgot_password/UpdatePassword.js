import React from 'react';
import * as yup from "yup";
import { Formik } from "formik";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = (props) => {
  
  const navigat = useNavigate();
  const email = props.data;
  const initialValues = {
    password: '',
    confirm_new_password: ''
  };

  const passwordSchema = yup.object().shape({
    password: yup.string().required("Enter new password"),
    confirm_new_password: yup.string().required("Enter new password again").oneOf([yup.ref("password"), null], "Password must match"),
  });

  const handleSubmit = async (values) =>{
    const dataToSend = {
      ...values,
      email: email
    }
    console.log(dataToSend);
    try {
      axios.post('http://localhost:8080/update_password', dataToSend)
      .then((res) => {
        if(res.data.message === 'Password updated successfully'){
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully'
          })
          .then((result) => {
            if(result.isConfirmed){
              navigat('/');
            }
          })
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <>
    <div className="background">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="row w-75">
            <div className="col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3">
              <div className="">
              <Formik
                  className="bg-white"
                  initialValues={initialValues}
                  validationSchema={passwordSchema}
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
                      <div className="h5 text-uppercase text-success py-4 text-center">
                        New password
                      </div>
                      <div className="pb-3 row position-relative password-toggle-container">
                        <input
                          className="inputField"
                          type="password"
                          name="password"
                          autoComplete="off"
                          placeholder="Enter password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
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
                          type="password"
                          name="confirm_new_password"
                          autoComplete="off"
                          placeholder="Enter password again"
                          value={values.confirm_new_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.confirm_new_password && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {errors.confirm_new_password}
                          </div>
                        )}
                      </div>
                      <div className="text-center pt-3 pb-5">
                        <button
                          type="submit"
                          className="input-button btn btn-primary"
                        >
                          Done
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
              
    </>
  )
}

export default UpdatePassword