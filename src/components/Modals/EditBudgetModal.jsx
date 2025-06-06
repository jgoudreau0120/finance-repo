import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';


const EditBudgetModal = ({isOpen, close, budgetEntry}) => {

  const { user } = useUser();
  const { updateFinances, finances, fetchFinances } = useFinances();
  const [percent, changePercent] = useState('');
  const [buttonState, changeButtonState] = useState(true);

  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submitEdit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/change-budget-category`, {username: user.Username, category: budgetEntry.Category, newPercent: percent});
      
      fetchFinances(user.Username);

      alert(`${budgetEntry.Category} was changed!`);
    }
    catch (e) {
      alert(`Could not update budget category.`);
    }
    close();
  }

  useEffect(() => {
    const isInvalid = percent === '' || isNaN(percent);
    changeButtonState(isInvalid);
  }, [percent]);

  const handleNumberChange = (event) => {
    let currentInputNumber = event.target.value;

    if (currentInputNumber.includes('.')){
      let [integer, decimal] = currentInputNumber.split('.');
      if (decimal.length > 2){
        decimal = decimal.substring(0, 2);
      }
      currentInputNumber = `${integer}.${decimal}`;
      event.target.value = currentInputNumber;
    }

    changePercent(parseFloat(currentInputNumber));
  };

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  };

  let expensesTotal = 0;

  //Calculate expenses total cost
  for (let i = 0; i < finances.expenses.length; i++){
    expensesTotal += parseFloat(finances.expenses[i].Cost);
  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={() => {close(); changePercent('Percent of Post-tax income (%)')}}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Edit <strong>{budgetEntry.Category}</strong></h2>
          <h3>Current Cost: {toUSD(((finances.postTaxIncome / 12 - expensesTotal) * (budgetEntry.PercentIncomeAllocated / 100)).toFixed(2))}</h3>
          <h3>At {budgetEntry.PercentIncomeAllocated}% of remaining monthly income</h3>
        </div>
        <div className={styles.body}>
          <input value={percent} placeholder='Percent of Post-tax income (%)' type='number' min={0} step={0.01} onChange={handleNumberChange}></input>
          <button className='btn btn-primary' onClick={submitEdit} disabled={buttonState}>Confirm</button>
          <button className='btn btn-secondary' onClick={() => {close(); changePercent('Percent of Post-tax income (%)')}}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default EditBudgetModal;