import styles from './IncomeTracking.module.css';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaxTable from '../../components/TaxTable/TaxTable';

const IncomeTracking = () => {

  const { user, setUser } = useUser();
  const { updateFinances, finances } = useFinances();
  const [taxStatus, setTaxStatus] = useState('Single');
  const [stateTaxRate, setStateRate] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(finances.income);
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  useEffect(() => {
    if (user) {
      setTaxStatus(user.TaxFilingStatus || 'Single');
      setStateRate(user.StateTaxRate || 0);
    }
  }, [user]);

  useEffect(() => {
    updateFinances('postTaxIncome', parseFloat(finances.income) - (calculateStateTax() + federalTax));
  }, [federalTax, taxStatus, stateTaxRate, user]);

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

  const updateStateTaxRate = async (value) => {
    calculateStateTax();
    setStateRate(value);

    if (!isNaN(value)){
      try {
        const response = await axios.post(`${apiUrl}/change-tax-rate`, { username: user.Username, newRate: parseFloat(value)});
      
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
        alert(`Could not update tax rate for user: ${user.Username} with rate: ${value}`);
      }
    }
  }

  const calculateStateTax = () => {
    let stateTaxTotal = 0;
    stateTaxTotal = stateTaxRate/100 * parseFloat(finances.income);
    return stateTaxTotal;
  }

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return(
    <div className={styles.incomeTracking}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1><strong>Income</strong></h1>
          <h3>
            {parseFloat(finances.income).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </h3>
        </div>

        <div className={styles.taxContainer}>
          <h4>Tax Filing Status</h4>
          <select value={taxStatus} onChange={(event) => updateTaxStatus(event.target.value)}>
            <option value='Single'>Single</option>
            <option value='Married Filing Jointly'>Married Filing Jointly</option>
            <option value='Married Filing Separately'>Married Filing Separately</option>
            <option value='Head of Household'>Head of Household</option>
          </select>

          <h4>Input State Tax Rate</h4>
          <input value={stateTaxRate} max={100} min={0} step={1} placeholder='State Tax Rate (%)' type='number' onChange={(event) => updateStateTaxRate(event.target.value)}></input>
        </div>
      </div>

      <div className={styles.bracketTableContainer}>
        <TaxTable onFederalTaxChange={setFederalTax}></TaxTable>
        <div className={styles.stateTaxLiabilityContainer}>
          <h3>Total State Tax Liability for 2025 =</h3>
          <h4><strong>{isNaN(calculateStateTax()) ? '$0.00' : toUSD(calculateStateTax())}</strong></h4>
        </div>
      </div>

      <div className={styles.totalTaxContainer}>
        <h2 style={{color: 'rgb(10, 191, 7)'}}>{toUSD(parseFloat(finances.income))}</h2>
        <h2>-</h2>
        <h2 style={{color: 'red'}}>{toUSD(calculateStateTax() + federalTax)}</h2>
      </div>

      <div className={styles.totalTaxContainer}>
        <h2>Post-Tax Income:</h2>
        <h2 style={{color: 'rgb(10, 191, 7)'}}>{isNaN(calculateStateTax()) ? toUSD(finances.income) : toUSD(parseFloat(finances.income) - (calculateStateTax() + federalTax))}</h2>
      </div>
    </div>
  )
}

export default IncomeTracking;