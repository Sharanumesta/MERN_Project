import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

const Registration = () => {

    const registrationSchema = yup.object().shape({
        name : yup.string().min(3).max(20).required('Enter your name'),
        email : yup.string().email().required('Enter your email'),
        phone : yup.string().required().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        password : yup.string().required('Enter your Password'),
        confirm_password : yup.string().required().oneOf([yup.ref('password'),null],'Password must match')
    });
    
    const initialValues =  {
        name : '',
        phone : '',
        email : '',
        password : '',
        confirm_password : ''
    }

    const navigate = useNavigate();
    
    const handleSubmit = async (values) => {
        try{
            await axios.post('http://localhost:8080/',values)
            .then(res =>{
                if(res.status === 400){
                    alert('User already exist please Login!');
                }else if (res.status === 200){
                    alert('Registration successful');
                    navigate("/login");
                }else{
                    Promise.reject();
                }
            })
        }
        catch(error) {
            console.error('Error:', error);
        }
    }
    
    const [type , setType] = useState('password');
    const [icon , setIcon] = useState(faEyeSlash);

    const passwordTogle = () => {
        if (type === 'password'){
            setType('text');
            setIcon(faEye);
        }else{
            setType('password');
            setIcon(faEyeSlash);
        }
    }
    return (
        <>
            <div className='background'>
                <div className='container d-flex justify-content-center align-items-center vh-100'>
                    <div className='row w-75'>
                        <div className='col-md-6 mx-auto border-0 shadow-lg bg-white rounded-3'>
                            <div className=''>
                                <Formik className='bg-white'
                                    initialValues = {initialValues} 
                                    validationSchema = {registrationSchema} 
                                    onSubmit = {handleSubmit}
                                >
                                    {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                                        <form className='mx-5' onSubmit={handleSubmit}>
                                            <div className='h3 text-uppercase text-success py-4 text-center'>Registration</div>
                                            <div className='pb-3 row'>
                                                <input className='form-control' type='text' name='name' autoComplete='off' placeholder='Name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                                {errors.name && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.name}</div>}
                                            </div>
                                            <div className='pb-3 row'>
                                                <input className='form-control' type='tel' name='phone' autoComplete='off' placeholder='Phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                                {errors.phone && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.phone}</div>}
                                            </div>
                                            <div className='pb-3 row'>
                                                <input className='form-control' type='email' name='email' autoComplete='off' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                {errors.email && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.email}</div>}
                                            </div>
                                            <div className='pb-3 row password-toggle-container'>
                                                <input className='form-control password-input' type ={type} name='password' autoComplete='off' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                                <FontAwesomeIcon onClick={passwordTogle} icon = {icon} className='eye-icon'/>
                                                {errors.password && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.password}</div>}
                                            </div>
                                            <div className='pb-3 row password-toggle-container'>
                                                <input className='form-control password-input' type ={type} name='confirm_password' autoComplete='off' placeholder='Confirm password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                                                <FontAwesomeIcon onClick={passwordTogle} icon = {icon} className='eye-icon'/>
                                                {errors.confirm_password && <div className='text-danger' style={{fontSize :'0.75rem'}}>{errors.confirm_password}</div>}
                                            </div>
                                            <div className='text-center pt-3 pb-5'>
                                                <button type='submit' className='input-button btn btn-primary'>Register</button>
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

export default Registration;