import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const Login = () => {
  const initialValues = {
    email : '',
    password : ''
  }

  const loginSchema = yup.object().shape({
    email : yup.string().email().required('Enter your Email'),
    password : yup.string().required('Enter yor Password')
  });

  const navigate = useNavigate();
  // const [error,setError] = useState('')

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:8080/login',values)
      .then(res =>{
        const { message, token } = res.data;
         if (message === 'Login successful'){
          localStorage.setItem('token', token);
          alert('Login Successful');
          navigate('/profile');
        }else if(message === 'Unauthorized'){
          setError('Enter correct email or password');
        }
      })
    } catch (error) {
      console.log(error.response.data); 
    }
  }

  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState('password');
  const passwordToggle = () => {
    if(type === 'password'){
      setIcon(faEye);
      setType('text');
    }else{
      setIcon(faEyeSlash);
      setType('password');
    }
  }

  return (
    <>
      <div className='background'>
        <div className='container d-flex justify-content-center align-items-center vh-100'>
          <div className='row w-75'>
            <div className='col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3'>
              <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
                {({ values, errors, handleSubmit, handleChange, handleBlur}) => (
                  <form className='mx-auto' onSubmit={handleSubmit}>
                    <div className='h3 text-uppercase text-success py-4 text-center'>Welcome Back</div>
                      <div className='pb-3 px-5 row'>
                          <input className='form-control' type='email' name='email' autoComplete='off' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                          {errors.email && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.email}</div>}
                      </div>
                      <div className='pb-3 px-5 row password-toggle-icon'>
                          <input className='form-control' type ={type} name='password' autoComplete='off' placeholder='Password' value={values.Password} onChange={handleChange} onBlur={handleBlur} />
                          {errors.password && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.password}</div>}
                          <FontAwesomeIcon onClick={passwordToggle} icon={icon} className='login_icon' />
                      </div>
                        { error && <div className='text-danger text-center' style={{fontSize :'0.75rem'}}>{error}</div> }
                      <div className='text-center pt-3 pb-5'>
                        <button type='submit' className='input-button btn btn-primary'>Login</button>
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

export default Login