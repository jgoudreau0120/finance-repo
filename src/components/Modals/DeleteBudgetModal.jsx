import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';

const DeleteBudgetModal = ({isOpen, close, budgetEntry}) => {
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();
  
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submitDeletion = async () => {
    try {
      const response = await axios.post(`${apiUrl}/delete-budget-category`, {username: user.Username, category: budgetEntry.Category});
      alert(`${budgetEntry.Category} was deleted from your budget!`);
      //Pull budget
      try {
        const response = await axios.get(`${apiUrl}/pull-budgeting/${user.Username}`);
        const budget = response.data.budget;

        if (budget) {
          updateFinances('budgetRecords', budget);
          localStorage.setItem('userBudget', JSON.stringify(budget));
        }
        else {
          alert("Couldn't pull budget for user");
        }
      }
      catch (e) {
        alert(`No remaining budget records for username: ${user.Username}`);
        updateFinances('budgetRecords', []);
        localStorage.setItem('userBudget', JSON.stringify([]));
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
          <div>Are you sure you want to delete <strong>{budgetEntry.Category}</strong> from your budget categories?</div>
          <button className='btn btn-primary' onClick={submitDeletion}>Confirm</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBudgetModal;