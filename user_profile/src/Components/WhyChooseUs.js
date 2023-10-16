import React from 'react';
import img7 from '../assets/img7.png'
import img8 from '../assets/img8.png'
import img9 from '../assets/img9.png'
import img10 from '../assets/img10.png'


const WhyChooseUs = () => {
  return (
    <>
        <div className="container WhyChoosUs mb-5 p-5">
            <div className="mt-5">
                <p className='text-shadow text-center pb-5 WhyChoosUs-head'>Why Choose Us?</p>
            </div>
            <div className="row pb-5 px-3 text-black">
                <div className="col-3 p-3">
                    <img src={img7} />
                    <h4 className='text-start pt-3'>Experience</h4>
                    <p className='fw-medium mt-3 text-secondary-emphasis'>Over a decade of excellence in the tech industry.</p>
                </div>
                <div className="col-3 p-3">
                    <img src={img8} />
                    <h4 className='text-start pt-3'>Expertise</h4>
                    <p className='fw-medium mt-3 text-secondary-emphasis'>Our team of professionals specializes in diverse tech domains.</p>
                </div>
                <div className="col-3 p-3">
                    <img src={img9} />
                    <h4 className='text-start pt-3'>Innovation</h4>
                    <p className='fw-medium mt-3 text-secondary-emphasis'>We stay ahead of the curve to provide you with the latest tech solutions.</p>
                </div>
                <div className="col-3 p-3">
                    <img src={img10} />
                    <h4 className='text-start pt-3'>Client Satisfaction</h4>
                    <p className='fw-medium mt-3 text-secondary-emphasis'>Our success is defined by the success of our clients.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default WhyChooseUs;