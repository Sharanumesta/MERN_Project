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
              <Link className='text-decoration-none' to="/">
                <h2>
                  <span>T</span>ech
                  <span>s</span>olution
                </h2>
              </Link>
            </div>
            <div className='nav-content'>
              <ul>
                <li><Link to="/"> home </Link></li>
                <li><Link to="/mail"> Mail </Link></li>
                <li><Link to="/profile"> profile </Link></li>
                <li><Link to="/logout"> Logout </Link></li>
              </ul>
            </div>
          </nav>
        </Headroom>
      </>
    );
  }
  
  export default CustomNavbar;