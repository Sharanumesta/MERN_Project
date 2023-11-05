import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-4">
              <div className="">
                <h2 className='pt-5 logo fs-3 text-light'>
                  <span className='fs-1'>T</span>ech
                  <span className='fs-1'>s</span>olution
                </h2>
                <p className='pt-3 px-3 text-secondary'>TechSolution is a tech solutions company committed to providing innovative, secure, and reliable tech services. Our mission is to empower businesses to thrive in the digital world.</p>
              </div>
            </div>
            <div className="col-4 text-light text-center ">
              <div className="pt-5 h3">Usefull links</div>
              <div className="fw-italic d-grid align-item-center justify-content-center text-secondary">
                <ul className='pt-3 text-start'>
                  <li>Home</li>
                  <li>Services</li>
                  <li>News</li>
                  <li>Contacts</li> 
                  <li>About us</li>
                </ul>
              </div>
            </div>
            <div className="col-4 text-center">
              <h3 className='pt-5 text-light font-weight-bold'>Contact us</h3>
              <p className='pt-3 text-secondary'>
              contact@techsolutionspro.com <br/>
              +1 (123) 456-7890
              </p>
              <div className="d-flex position-relative h-50 text-white">
                <div className="box position-absolute bottom-0 end-0 justify-content-end">
                  <a href='#hero'>
                    <FontAwesomeIcon icon={ faArrowUpLong } size="2xl" style={{color: "#47a3e2"}} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer