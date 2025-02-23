import '../../App.css';
import styles from './CreateUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import axios from 'axios';
import { useState } from 'react';

const CreateUser = () => {
  
  const apiUrl = 'http://localhost:8000';
  const [userData, setUserData] = useState({firstName: "", lastName: "", username: "", password: ""});
  const [submitButtonState, setSubmitState] = useState(true);

  const checkSubmit = () => {
    let inputs = document.getElementsByName('submitRequires');

    for (let i = 0; i < inputs.length; i++){
      if (inputs[i].value == ''){
        setSubmitState(true);
        return;
      }
    }

    setSubmitState(false);
  }

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    try {
      const response = await axios.post(`${apiUrl}/create-user`, userData);
      console.log('Response:', response);
      alert(response.data.message)
    }
    catch (e) {
      alert('Error creating user');
    }
  };

  const handleChange = (event) => {
    setUserData({...userData, [event.target.id]: event.target.value});
    checkSubmit();
  };

  return(
    <div className={classNames('background', styles.createUserBackground)}>
      <div className={styles.container}>
        <div className='row'>
          <h1>Create a User Profile</h1>
        </div>
        <div className='row'>
          <div className='col'>
            <input id='firstName' name='submitRequires' placeholder='First Name' value={userData.firstName} onChange={handleChange} onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input id='lastName' name='submitRequires' placeholder='Last Name' value={userData.lastName} onChange={handleChange} onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input id='username' name='submitRequires' placeholder='Username' value={userData.username} onChange={handleChange} onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input id='password' name='submitRequires' placeholder='Password' value={userData.password} onChange={handleChange} onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button id='submitButton' className='btn btn-success' onClick={handleSubmit} disabled={submitButtonState}>Create User</button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Link to='/'><button className='btn btn-success'>Back To Login</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser;