
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './Login.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";

const Login = () => {
  return (
    <div className='background flex center inherit'>
      <div className='container'>
        <div className='row center'>
          <h1>FYW: Finance, Your Way</h1>
        </div>
        <div className='row center'>
          <input className='wide' id='myUsernameInput' type='text' placeholder='Username'/>
        </div>
        <div className='row center'>
          <input className='wide' id='myPasswordInput' type='password' placeholder='Password'/>
        </div>
        <div className='row'>
          <button className='btn btn-info wide helpButton'>Can't log in?</button>
        </div>
        <div className='row center'>
          <button className='btn btn-primary wide'>Sign In</button>
        </div>
        <div className='row center'>
          <Link to='/createUser'><button className='btn btn-success wide'>Create User</button></Link>
          
        </div>
      </div>
    </div>
  )
}

export default Login;