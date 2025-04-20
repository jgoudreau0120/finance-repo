import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';


const EditModal = ({isOpen, close, expense}) => {

  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  const [cost, changeCost] = useState('Cost (without $)');
  const [buttonState, changeButtonState] = useState(true);
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submitEdit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/change-expense`, {username: user.Username, expenseName: expense.ExpenseName, cost: cost});
      alert(`${expense.ExpenseName} was changed!`);

      try {
        const response = await axios.get(`${apiUrl}/pull-expenses/${user.Username}`);
        const updatedExpenses = response.data.expenses;
  
        if (updatedExpenses) {
          updateFinances('expenses', updatedExpenses);
          localStorage.setItem('userExpenses', JSON.stringify(updatedExpenses));
        } else {
          alert("Couldn't pull updated expenses");
        }
      } 
      catch (e) {
        alert(`Could not fetch updated expenses for user: ${user.Username}`);
      }
    }
    catch (e) {
      alert(`Could not update expense`);
    }
    close();
  }
  useEffect(() => {
    const isInvalid = cost === '' || isNaN(cost);
    changeButtonState(isInvalid);
  }, [cost]);

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

    changeCost(parseFloat(currentInputNumber));
  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={() => {close(); changeCost('Cost (without $)')}}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Edit <strong>{expense.ExpenseName}</strong></h2>
          <h3>Current Cost: {parseFloat(expense.Cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}</h3>
        </div>
        <div className={styles.body}>
          <input value={cost} placeholder='Cost (without $)' type='number' min={0} step={0.01} onChange={handleNumberChange}></input>
          <button className='btn btn-primary' onClick={submitEdit} disabled={buttonState}>Confirm</button>
          <button className='btn btn-secondary' onClick={() => {close(); changeCost('Cost (without $)')}}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal;