import react, { useEffect, useState } from 'react';
import './Navbar.css'
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const [pageTitle, setPageTitle] = useState('');

  //Grab the url to determine how to set the title of the page
  const location = useLocation();

  useEffect(() => {
    switch(location.pathname) {

      case '/home':
        setPageTitle('Home');
        document.title = 'Home';
        break;

      case '/myAccount':
        setPageTitle('My Account');
        document.title = 'Your Account';
        break;

      case '/settings':
        setPageTitle('Settings');
        document.title = 'Settings';
        break;

      default:
        setPageTitle('Login');
        document.title = 'Login';
        break;        
    }
    //Listens for changes in url to re render
  }, [location.pathname]
  );
  

  return (
    <nav className='nav'>
      <span id='myPageTitle' className='page-title'>{pageTitle}</span>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/myAccount'>My Account</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;