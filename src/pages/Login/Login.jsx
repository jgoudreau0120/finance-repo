import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import styles from './Login.module.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = 'http://localhost:8000';

  const handleSignIn = async () => {
    if (username === "" || password === ""){
      alert("Please enter both a username and password.")
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/check-login`, {username, password});
      const user = response.data.user;

      if (user) {
        alert(response.data.message);
      }
      else {
        alert("Invalid username or password!");
      }
    }
    catch (e) {
      alert(`Could not find account with username: ${username}`);
    }

  };

  return (
    <div className={classNames('background', styles.loginBackground)}>
      <div className={styles.container}>
        <div className='row'>
          <h1>FYW: Finance, Your Way</h1>
        </div>
        <div className='row'>
          <input id='myUsernameInput' type='text' placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div className='row'>
          <input id='myPasswordInput' type='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className='row left'>
          <button className={classNames('btn', 'btn-info', styles.helpButton)}>Can't log in?</button>
        </div>
        <div className='row'>
          <button className='btn btn-primary' onClick={handleSignIn}>Sign In</button>
        </div>
        <div className='row'>
          <Link to='/createUser'><button className='btn btn-success'>Create User</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;