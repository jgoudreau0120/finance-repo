import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import styles from './Login.module.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';


const Login = () => {
  return (
    <div className={classNames('background', styles.loginBackground)}>
      <div className={styles.container}>
        <div className='row'>
          <h1 className='header'>FYW: Finance, Your Way</h1>
        </div>
        <div className='row'>
          <input id='myUsernameInput' type='text' placeholder='Username'/>
        </div>
        <div className='row'>
          <input id='myPasswordInput' type='password' placeholder='Password'/>
        </div>
        <div className='row left'>
          <button className={classNames('btn', 'btn-info', styles.helpButton)}>Can't log in?</button>
        </div>
        <div className='row'>
          <button className='btn btn-primary'>Sign In</button>
        </div>
        <div className='row'>
          <Link to='/createUser'><button className='btn btn-success'>Create User</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;