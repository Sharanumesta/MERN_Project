import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <nav class="bg-dark navbar navbar-expand navbar-dark b-dark nav pt-4 pb-4">
      <div class="container">
        <Link to="/profile" class="navbar-brand fw-bold fs-3 rounded p-1 text-info">Profile</Link>
        <ul class="navbar-nav">
            <li class="nav-item">
                <Link to="/" class="nav-link active ms-2 me-2 fw-bold">Registration</Link>
            </li>
            <li class="nav-item">
              <Link to="/login" className="nav-link active ms-2 me-2 fw-bold"> Login </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default CustomNavbar;