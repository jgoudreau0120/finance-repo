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

      default:
        setPageHeader('Login');
        documentTitle = 'Login';
        break;        
    }

    document.title = `FYW | ${documentTitle}`;
    //Listens for changes in url to re render
  }, [location.pathname]
  );
  

  return (
    <nav className={classNames(styles.nav, styles.hidden)}>
      <span id='myPageTitle' className={styles.pageTitle}>{pageTitle}</span>
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