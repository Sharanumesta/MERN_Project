import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Profile from './components/Profile';
import Login from './components/Login';
import CustomNavbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
      <CustomNavbar />
        <Routes>
          <Route path='/' Component={Registration} />
          <Route path='/profile' Component={Profile} />
          <Route path='/login' Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
