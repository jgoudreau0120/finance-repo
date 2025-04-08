import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import styles from './Login.module.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');
    if (loggedInUser != null) {
      setUser(JSON.parse(loggedInUser));
      const income = JSON.parse(localStorage.getItem('userIncome'));
      const expenses = JSON.parse(localStorage.getItem('userExpenses'));
      updateFinances('income', income);
      updateFinances('expenses', expenses);
      navigate('/home');
    }
    else {
      navigate('/');
    }
  }, []);

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
        localStorage.setItem('userData', JSON.stringify(user));

        navigate('/home');
        //Pull income
        try {
          const response = await axios.get(`${apiUrl}/pull-income/${username}`);
          const income = response.data.income;
  
          if (income) {
            updateFinances('income', income);
            localStorage.setItem('userIncome', JSON.stringify(income));
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
            localStorage.setItem('userExpenses', JSON.stringify(expenses));
          }
          else {
            alert("Couldn't pull expenses for user")
          }
        }
        catch (e) {
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
    <div className={classNames('background', styles.login)}>
      <div className={styles.titleContainer}>
        <h1>FYW: Finance, Your Way</h1>
      </div>
      <div className={styles.container}>
        <input id='myUsernameInput' type='text' placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
        <input id='myPasswordInput' type='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
        <button className={classNames('btn', 'btn-info', styles.helpButton)}>Can't log in?</button>
        <button className='btn btn-primary' onClick={handleSignIn}>Sign In</button>
        <Link to='/createUser'><button className='btn btn-success'>Create User</button></Link>
      </div>
    </div>
  )
}

export default Login;