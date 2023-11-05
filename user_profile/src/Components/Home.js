import React from 'react';
import '../App.css';
import { motion } from 'framer-motion/dist/framer-motion';
import img3 from '../assets/img3.png';
import Navbar from './Navbar';
import Servises from './Services';
import WhyChooseUs from './WhyChooseUs';
import Mail from './Mail';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <div id='hero'>
        <Navbar />
        <div className='container' >
          <div className='row h-100 my-5'>
            <div className='col-6 d-flex flex-column justify-content-center align-items-center headfont'>
              <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <p className='headline'>Welcome to TechSolutions</p>
                <p className='text-center'>Your Trusted Partner for Technology Consulting</p>
              </motion.div>
            </div>
            <div className='col-6 d-flex flex-column justify-content-center align-items-center'>
              <motion.div 
                initial={{ x: '100vw' }}
                animate={{ x:0}}
                transition={{ duration: 1, ease: "easeInOut"}}
              >
                <img src={img3} alt='Image Description' className='img3 img-fluid' />  
              </motion.div>  
            </div>
          </div>
          <div className="h5 d-flex flex-column align-items-center mb-5">
            <motion.div 
              initial={{ y: '-100vh' }}
              animate={{ y:0}}
              transition={{ duration: 1, ease: "easeInOut"}}
            >
              <i>We deliver cutting-edge technology solutions tailored to your unique needs, driving your success in the digital age.</i>
            </motion.div> 
          </div>
        </div>
        <Servises/>
        <WhyChooseUs />
        <Mail />
        <Footer />
      </div>
    </>
  );
};

export default Home;