import '../../App.css';
import styles from './CreateUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';

const CreateUser = () => {

  function checkSubmit(){
    let inputs = document.getElementsByName('submitRequires');

    for (let i = 0; i < inputs.length; i++){
      if (inputs[i].value == ''){
        document.getElementById('submitButton').disabled = true;
        return;
      }
    }

    document.getElementById('submitButton').disabled = false;
  }

  return(
    <div className={classNames('background', styles.createUserBackground)}>
      <div className={styles.container}>
        <div className='row'>
          <h1 className='header'>Create a User Profile</h1>
        </div>
        <div className='row'>
          <div className='col'>
            <input name='submitRequires' placeholder='First Name' onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input name='submitRequires' placeholder='Last Name' onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input name='submitRequires' placeholder='Username' onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input name='submitRequires' placeholder='Password' onKeyUp={checkSubmit}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button id='submitButton' className='btn btn-success' disabled>Create User</button>
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