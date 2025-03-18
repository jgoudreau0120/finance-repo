import react, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';

const Navbar = () => {

  const [pageTitle, setPageHeader] = useState('');

  //Grab the url to determine how to set the title of the page
  const location = useLocation();

  useEffect(() => {

    let documentTitle = '';

    switch(location.pathname) {

      case '/home':
        setPageHeader('Home');
        documentTitle = 'Home';
        break;

      case '/myAccount':
        setPageHeader('My Account');
        documentTitle = 'Your Account';
        break;

      case '/settings':
        setPageHeader('Settings');
        documentTitle = 'Settings';
        break;

      case '/expenses':
        setPageHeader('Expenses');
        documentTitle = 'Expenses';
        break;

      
      default:
        setPageHeader('Login');
        documentTitle = 'Login';
        break;        
    }

    document.title = `FYW | ${documentTitle}`;
    //Listens for changes in url to re render
  }, [location.pathname]
  );
  
  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userIncome');
    localStorage.removeItem('userExpenses');
    window.location.href = '/';
  }

  return (
    <nav className={classNames(styles.nav)}>
      <h2>{pageTitle}</h2>

      <div className={styles.quickButtonContainer}>
        <Link to='/home'>Home</Link>
        <Link to='/myAccount'>My Account</Link>
        <Link to='/settings'>Settings</Link>
        <Link to='/' className={styles.logout} onClick={logout}>Log Out</Link>
      </div>
      
    </nav>
  )
}

export default Navbar;