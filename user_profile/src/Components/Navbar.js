import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
      <>
        <nav className='nav-main'>
          <div className='logo'>
            <Link className='text-decoration' to="/">
              <h2>
                <span>S</span>haranu
                <span>M</span>esta
              </h2>
            </Link>
          </div>
          <div className='nav-content'>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/mail"> Mail </Link>
              </li>
              <li>
                <Link to="/profile"> profile </Link>
              </li>
              <li>
              <Link to="/logout"> Logout </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  
  export default CustomNavbar;