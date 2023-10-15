import React from 'react';
import '../App.css';
import Navbar from './Navbar';
import img3 from '../assets/img3.png';
import Servises from './Services';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row h-100 my-5'>
          <div className='col headline d-flex flex-column justify-content-center align-items-center headfont'>
            <h1>Welcome to TechSolutions</h1>
            <p>Your Trusted Partner for Technology Consulting</p>
          </div>
          <div className='col d-flex flex-column justify-content-center align-items-center'>
            <img src={img3} alt='Image Description' className='img3 img-fluid' />
          </div>
        </div>
        <div className="h5 d-flex flex-column align-items-center mb-5">
          <i>We deliver cutting-edge technology solutions tailored to your unique needs, driving your success in the digital age.</i>
        </div>
      </div>
        <Servises />
    </>
  );
};

export default Home;
