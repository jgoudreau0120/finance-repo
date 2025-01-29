import styles from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import classNames from 'classnames';


const Login = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.header}>FYW: Finance, Your Way</h1>
        </div>
        <div className={styles.row}>
          <input id='myUsernameInput' type='text' placeholder='Username'/>
        </div>
        <div className={styles.row}>
          <input id='myPasswordInput' type='password' placeholder='Password'/>
        </div>
        <div className={classNames(styles.row, styles.left)}>
          <button className={classNames('btn', 'btn-info', styles.helpButton)}>Can't log in?</button>
        </div>
        <div className={styles.row}>
          <button className='btn btn-primary'>Sign In</button>
        </div>
        <div className={styles.row}>
          <Link to='/createUser'><button className='btn btn-success'>Create User</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;