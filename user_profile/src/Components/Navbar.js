import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Headroom from 'react-headroom';

const CustomNavbar = () => {
  return (
      <>
        <Headroom>
          <nav className='nav-main'>
            <div className='logo'>
              <a className='text-decoration-none' href='#hero'>
                <h2>
                  <span>T</span>ech
                  <span>s</span>olution
                </h2>
              </a>
            </div>
            <div className='nav-content'>
              <ul>
                <li><a href='./#hero' > home </a></li>
                <li><a href='./#mail'> Mail </a></li>
                <li><a href='./#services'> Services </a></li>
                <li><Link to="/profile"> profile </Link></li>
              </ul>
            </div>
          </nav>
        </Headroom>
      </>
    );
  }
  
  export default CustomNavbar;