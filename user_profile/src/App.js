import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Logout from './Components/Logout';
import CustomNavbar from './Components/Navbar';
import Mail from './Components/Mail';

function App() {
  return (
    <>
      <Router>
      <CustomNavbar />
        <Routes>
          <Route path='/' Component={Registration} />
          <Route path='/profile' Component={Profile} />
          <Route path='/login' Component={Login} />
          <Route path='/logout' Component={Logout} />
          <Route path='mail' Component={Mail} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
