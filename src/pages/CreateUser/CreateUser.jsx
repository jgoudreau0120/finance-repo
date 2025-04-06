import '../../App.css';
import styles from './CreateUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import axios from 'axios';
import { useState } from 'react';

const CreateUser = () => {
  
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';
  const [userData, setUserData] = useState({firstName: "", lastName: "", username: "", password: "", initialIncome: "", initialStateRate: ""});
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
    //First create the user
    try {
      const response = await axios.post(`${apiUrl}/create-user`, userData);
      console.log('Response:', response);
      alert(response.data.message);
      //Then add the initial income to the records
      try {
        const response = await axios.post(`${apiUrl}/add-income`, {username: userData.username, income: userData.initialIncome});
        console.log('Response:', response);
        alert(response.data.message);
      }
      catch (e) {
        alert('Error adding income');
      }
    }
    catch (e) {
      alert('Error creating user or username already exists');
    }
    setUserData({firstName: "", lastName: "", username: "", password: "", initialIncome: "", initialStateRate: ""});

  };

  const handleChange = (event) => {
    setUserData({...userData, [event.target.id]: event.target.value});
    checkSubmit();
  };

  return(
    <div className={styles.createUserBackground}>
      <div className={styles.container}>
        <h1>Create a User Profile</h1>
        <input id='firstName' name='submitRequires' placeholder='First Name' value={userData.firstName} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <input id='lastName' name='submitRequires' placeholder='Last Name' value={userData.lastName} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <input id='username' name='submitRequires' placeholder='Username' value={userData.username} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <input id='password' name='submitRequires' placeholder='Password' value={userData.password} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <input id='initialIncome' type='number' name='submitRequires' placeholder='Starting Income' value={userData.initialIncome} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <input id='initialStateRate' type='number' name='submitRequires' placeholder='State Tax Rate (%)' value={userData.initialStateRate} onChange={handleChange} onKeyUp={checkSubmit}></input>
        <button id='submitButton' className='btn btn-success' onClick={handleSubmit} disabled={submitButtonState}>Create User</button>
        <Link to='/'><button className='btn btn-success'>Back To Login</button></Link>
      </div>
    </div>
  )
}

export default CreateUser;