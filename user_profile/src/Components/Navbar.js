import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <nav class="navbg navbar navbar-expand navbar-dark nav pt-4 pb-4">
      <div class="container ">
        <Link to="/profile" class="navbar-brand fw-bold fs-3 rounded p-1 text-success">Profile</Link>
        <ul class="navbar-nav">
            <li class="nav-item">
                <Link to="/" class="nav-link active ms-2 me-3 fw-bold text-success">Registration</Link>
            </li>
            <li class="nav-item">
              <Link to="/" className="nav-link active ms-3 me-3 fw-bold text-success"> Login </Link>
            </li>
            <li class="nav-item">
              <Link to="/logout" className="nav-link active ms-3 me-3 fw-bold text-success"> Logout </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default CustomNavbar;