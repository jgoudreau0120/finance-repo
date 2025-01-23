import react from 'react';
import './Navbar.css'

function Navbar(){
  return (
    <nav className="nav">
      <span className="page-title">Page title here</span>
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