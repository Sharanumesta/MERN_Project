import React from 'react';
import * as yup from "yup";
import { Formik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';

function Mail() {
    const initialValues = {
        to: "",
        subject: "",
        text: ""
      };
    
      const mailSchema = yup.object().shape({
        to: yup.string().email().required("Enter to Email"),
        subject: yup.string().required("subject cannot be empty"),
        text: yup.string().required("text cannot be empty")
      });

      const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:8080/mail',values)
                .then((res) =>{
                    const response = res.data.message;
                    if(response === 'Email sent successfully'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Sent',
                            text: 'Mail has been sent',
                            confirmButtonText: 'OK',
                        }).then((result) => {
                            if(result.isConfirmed){
                                window.location.reload();
                            }
                        })
                    }
                });
        } catch (error) {
            console.log(error);
        }
      }
  return (
    <>
      <div className="background container" id='mail'>
        <div className=" d-flex justify-content-center align-items-center m-5">
          <div className="row w-75">
            <div className="col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3">
              <Formik
                initialValues={initialValues}
                validationSchema={mailSchema}
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
                    <div className="h3 text-uppercase text-success py-4 text-center">
                      Send Mail
                    </div>
                    <div className="pb-3 px-5 row">
                      <input
                        className="form-control"
                        type="email"
                        name="to"
                        autoComplete="off"
                        placeholder="To"
                        value={values.to}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {errors.to && ( */}
                        <div
                          className="text-danger"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {errors.to}
                        </div>
                      {/* )} */}
                    </div>
                    <div className="pb-3 px-5 row password-toggle-icon">
                      <input
                        className="form-control"
                        type="text"
                        name="subject"
                        autoComplete="off"
                        placeholder="Subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {errors.password && ( */}
                        <div
                          className="text-danger"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {errors.subject}
                        </div>
                      {/* )} */}
                      </div>
                      <div className="pb-3 px-5 row">
                      <input
                        className="form-control"
                        type="text"
                        name="text"
                        autoComplete="off"
                        placeholder="Text"
                        value={values.text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {errors.to && ( */}
                        <div
                          className="text-danger"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {errors.text}
                        </div>
                      {/* )} */}
                    </div>
                    <div className="text-center pt-3 pb-5">
                      <button
                        type="submit"
                        className="input-button btn btn-primary"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mail
