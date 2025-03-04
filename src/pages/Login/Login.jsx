import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import styles from './Login.module.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { setUser } = useUser();
  const { updateFinances } = useFinances();
  const { setFinances }= useFinances();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const handleSignIn = async () => {
    if (username === "" || password === ""){
      alert("Please enter both a username and password.")
      return;
    }

    //First pull user data
    try {
      const response = await axios.post(`${apiUrl}/check-login`, {username, password});
      const user = response.data.user;
      
      if (user) {
        alert(response.data.message);
        setUser(user);
        navigate('/home');
        //Pull income
        try {
          const response = await axios.get(`${apiUrl}/pull-income/${username}`);
          const income = response.data.income;
  
          if (income) {
            updateFinances('income', income);
          }
          else {
            alert("Couldn't pull income for user")
          }
        }
        catch (e) {
          alert(`Could not find income with username: ${username}`);
        }
        //Pull expenses
        try {
          const response = await axios.get(`${apiUrl}/pull-expenses/${username}`);
          const expenses = response.data.expenses;
  
          if (expenses) {
            updateFinances('expenses', expenses);
          }
          else {
            alert("Couldn't pull expenses for user")
          }
        }
        catch (e) {
          console.log(e);
          alert(`Could not find expenses with username: ${username}`);
        }
  
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