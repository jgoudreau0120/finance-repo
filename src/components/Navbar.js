import react from 'react';
import './Navbar.css'

function Navbar(){
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href='./myAccount'>My Account</a>
        </li>
        <li>
          <a href='./about'>About</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;