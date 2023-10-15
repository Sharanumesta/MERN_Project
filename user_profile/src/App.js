import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Mail from './Components/Mail';
import ForgotPassword from './Components/forgot_password/ForgotPassword';
import Home from './Components/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/logout' Component={Logout} />
          <Route path='/registration' Component={Registration} />
          <Route path='/profile' Component={Profile} />
          <Route path='/mail' Component={Mail} />
          <Route path='/forgot_password' Component={ForgotPassword} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
