import styles from './CreateUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className={styles.background}>
      <div className={styles.container}>
        <div className='row'>
          <h1>Create a User Profile</h1>
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
      </div>
    </div>
  )
}

export default CreateUser;