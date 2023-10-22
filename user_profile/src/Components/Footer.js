import React from 'react'
import '../App.css'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col logo ">
              <div className="row pt-5">
                <h2 className='fs-3'>
                  <span className='fs-1'>T</span>ech
                  <span className='fs-1'>s</span>olution
                </h2>
                <p className='pt-3 px-3 text-secondary'>TechSolutions is a tech solutions company committed to providing innovative, secure, and reliable tech services. Our mission is to empower businesses to thrive in the digital world.</p>
              </div>
            </div>
            <div className="col text-light text-center ">
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
            <div className="col text-center">
              <h3 className='pt-5 text-light font-weight-bold'>Contact us</h3>
              <p className='pt-3 text-secondary'>
              contact@techsolutionspro.com <br/>
              +1 (123) 456-7890
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer