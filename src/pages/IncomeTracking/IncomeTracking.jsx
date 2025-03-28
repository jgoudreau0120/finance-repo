import styles from './IncomeTracking.module.css';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import { useState } from 'react';
import axios from 'axios';

const IncomeTracking = () => {

  const { user, setUser } = useUser();
  const { updateFinances, finances } = useFinances();
  const [taxStatus, setTaxStatus] = useState(user.TaxFilingStatus);
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';
  

  const updateTaxStatus = async (status) => {
    setTaxStatus(status);
    
    try {
      const response = await axios.post(`${apiUrl}/change-tax-status`, { username: user.Username, newStatus: status});
      
      try {
        const response2 = await axios.post(`${apiUrl}/pull-user`, { username: user.Username });
        const updatedUser = response2.data.user;
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      }
      catch (e) {
        alert(`Could not fetch updated user: ${user.Username}`);
      }
    } 
    catch (e) {
      alert(`Could not update tax filing status for user: ${user.Username}`);
    }
  }

  return(
    <div className={styles.incomeTracking}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2><strong>Income</strong></h2>
        </div>

        <div>

        </div>

        <div className={styles.taxContainer}>
          <h4>Tax Filing Status</h4>
          <select value={taxStatus} onChange={(event) => updateTaxStatus(event.target.value)}>
            <option value='Single'>Single</option>
            <option value='Married Filing Jointly'>Married Filing Jointly</option>
            <option value='Head of Household'>Head of Household</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default IncomeTracking;