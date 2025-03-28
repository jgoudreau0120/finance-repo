import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';

const DeleteModal = ({isOpen, close, expense}) => {
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submitDeletion = async () => {
    try {
      const response = await axios.post(`${apiUrl}/delete-expense`, {username: user.Username, expenseName: expense.ExpenseName});
      alert(`${expense.ExpenseName} was deleted from your expenses!`);

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
      alert(`Could not delete expense`);
    }
    close();
  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Delete Confirmation</h2>
        </div>
        <div className={styles.body}>
          <div>Are you sure you want to delete <strong>{expense.ExpenseName}</strong> from your expenses?</div>
          <button className='btn btn-primary' onClick={submitDeletion}>Confirm</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;