import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AccountManagement.module.css';
import { useState } from "react";

const AccountManagement = () => {
  const [buttonState, changeButtonState] = useState(true);

  const handleInputChange = () => {
    const inputElems = document.getElementsByName('changePasswordInput');

    for (let i = 0; i < inputElems.length; i++){
      if (inputElems[i].value == ''){
        changeButtonState(true);
        return;
      }
    }

    changeButtonState(false);
  }

  return (
    <div className={styles.myAccount}>
      <div className={styles.container}>
        <input placeholder='Old Password' name='changePasswordInput' onChange={handleInputChange}></input>
        <input placeholder='New Password' name='changePasswordInput' onChange={handleInputChange}></input>
        <input placeholder='Confirm New Password' name='changePasswordInput' onChange={handleInputChange}></input>
        <button className='btn btn-primary' disabled={buttonState}>Change Password</button>
      </div>
    </div>
  )
}

export default AccountManagement;