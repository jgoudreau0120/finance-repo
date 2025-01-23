import react, { useState } from 'react';
import './Navbar.css'



function Navbar(){

  const [pageTitle, setPageTitle] = useState('Page title here');

  function changePageTitle(pageName){
    setPageTitle(pageName);
  }

  return (
    <nav className='nav'>
      <span id='myPageTitle' className='page-title'>{pageTitle}</span>
      <ul>
        <li>
          <a href='./myAccount'>My Account</a>
        </li>
        <li>
          <a href='./about'>About</a>
        </li>
        <li>
          <a href='./random'>Random</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;