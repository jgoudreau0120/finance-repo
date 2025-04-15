import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AccountManagement.module.css';
import { useState } from "react";
import axios from "axios";
import { useFinances } from "../../FinancialContext";
import { useUser } from "../../UserContext";

const AccountManagement = () => {
  const [buttonState, changeButtonState] = useState(true);
  const [inputData, setInputData] = useState({ oldPassword: '', newPassword: '', confirmedNewPassword: '' });
  const { finances, updateFinances } = useFinances();
  const { user, setUser } = useUser();

  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const handleInputChange = (event) => {
    const newInputData = {...inputData, [event.target.id]: event.target.value};
    setInputData(newInputData);

    const inputElems = document.getElementsByName('changePasswordInput');

    for (let i = 0; i < inputElems.length; i++){
      if (inputElems[i].value == ''){
        changeButtonState(true);
        return;
      }
    }

    if (newInputData.newPassword == newInputData.confirmedNewPassword){
      changeButtonState(false);
    }
    else {
      changeButtonState(true);
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/change-password`, { username: user.Username, oldPassword: inputData.oldPassword, newPassword: inputData.newPassword });
      const message = response.data.message;
      alert(message);
    }
    catch (e) {
      alert(`Could not update password.`);
    }

    const inputElems = document.getElementsByName('changePasswordInput');

    for (let i = 0; i < inputElems.length; i++){
      inputElems[i].value = '';
    }

  }

  return (
    <div className={styles.myAccount}>
      <div className={styles.container}>
        <h2>Change Password</h2>
        <input value={inputData.oldPassword} id='oldPassword' placeholder='Old Password' name='changePasswordInput' onChange={handleInputChange}></input>
        <input value={inputData.newPassword} id='newPassword' placeholder='New Password' name='changePasswordInput' type='password' onChange={handleInputChange}></input>
        <input value={inputData.confirmedNewPassword} id='confirmedNewPassword' placeholder='Confirm New Password' name='changePasswordInput' type='password' onChange={handleInputChange}></input>
        <button className='btn btn-primary' onClick={handleSubmit} disabled={buttonState}>Change Password</button>
      </div>
    </div>
  )
}

export default AccountManagement;