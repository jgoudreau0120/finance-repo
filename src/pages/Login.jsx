import './Login.css';
import '../App.css';

const Login = () => {
  return (
    <div className='flex center inherit' style={{backgroundColor: 'rgba(112, 130, 100)'}}>
      <h1>FYW: Finance, Your Way</h1>
      <div className='row center'>
        <input className='wide' id='myUsernameInput' type='text' placeholder='Username'/>
      </div>
      <div className='row center'>
        <input className='wide' id='myPasswordInput' type='password' placeholder='Password'/>
      </div>
      <div className='row'>
        <button className='help wide'>Can't log in?</button>
      </div>
      <div className='row center'>
        <button className='submit wide'>Sign In</button>
      </div>
      <div className='row center'>
        <button className='new wide'>Create User</button>
      </div>
    </div>
  )
}

export default Login;