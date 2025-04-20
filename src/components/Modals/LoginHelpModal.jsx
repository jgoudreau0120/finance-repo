import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import { useState } from 'react';
import axios from 'axios';

const LoginHelpModal = ({ isOpen, close }) => {
  const { user } = useUser();
  const { fetchFinances } = useFinances();
  const [submitState, setSubmitState] = useState(true);
  const [inputUsername, setInputUsername] = useState('');
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/pull-password`, {username: inputUsername, firstName: inputFirstName, lastName: inputLastName});
      if (response) {
        alert(`Your password is: ${response.data.password}`);
      }
    }
    catch (e) {
      alert(`Could not retrieve password for account.`);
    }
    close();
  }

  const handleInputChange = () => {
    const inputs = document.getElementsByName('inputs');

    for (let i = 0; i < inputs.length; i++){
      if (inputs[i].value == ''){
        setSubmitState(true);
        return;
      }
    }

    setSubmitState(false);
  }


  if(!isOpen){
    return null;
  }

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Login Help</h2>
        </div>
        <div className={styles.body}>
          <input placeholder='Username' name='inputs' value={inputUsername} onChange={(event) => {handleInputChange(); setInputUsername(event.target.value);}}></input>
          <input placeholder='First Name' name='inputs' value={inputFirstName} onChange={(event) => {handleInputChange(); setInputFirstName(event.target.value);}}></input>
          <input placeholder='Last Name' name='inputs' value={inputLastName} onChange={(event) => {handleInputChange(); setInputLastName(event.target.value);}}></input>
          <button className='btn btn-primary' onClick={submit} disabled={submitState}>Retrieve Password</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default LoginHelpModal;