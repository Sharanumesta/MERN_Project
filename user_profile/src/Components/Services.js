import React from 'react';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import WhyChooseUs from './WhyChooseUs';


const Servises = () => {
  return (
    <>
        <div className="container mb-5 p-5" id='services'>
            <div className="d-flex justify-content-center align-items-center">
                <div className="row mb-5">
                    <h2 className='fw-medium text-shadow mb-4'>Our Tech Services</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="row image-container img-fluid">
                        <img src={img4} alt="" className='img'/>
                    </div>
                    <div className="row mt-5">
                        <h5 className='text-center text-primary'>Software Development</h5>
                        <p className='px-5 h6 mt-2'>
                            <i clssname=''>Crafting custom software solutions to streamline your operations and enhance user experiences.</i>
                        </p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row image-container img-fluid">
                        <img src={img5} alt="" className='img'/>
                    </div>
                    <div className="row mt-5">
                        <h5 className='text-center text-primary'>IT Consulting</h5>
                        <p className="px-5 h6 mt-2">
                            <i clssname=''>Guiding your tech strategy with expert insights and industry best practices is the cornerstone of our approach.</i>
                        </p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row image-container img-fluid">
                        <img src={img6} alt="" className='img'/>
                    </div>
                    <div className="row mt-5">
                        <h5 className='text-center text-primary'>Cybersecurity</h5>
                        <p className="px-5 h6 mt-2">
                            <i clssname=''>We take responsibility seriously and go the extra mile to safeguard your business with comprehensive security measures.</i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Servises