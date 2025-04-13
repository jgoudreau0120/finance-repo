import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';

const AddBudgetModal = ({isOpen, close}) => {
  const [name, changeName] = useState('');
  const [percent, changePercent] = useState('Percent of Post-tax income (%)');
  const { user } = useUser();
  const { updateFinances, finances } = useFinances();

  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

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
  }

  const submitAddition = async () => {

    try {
      const response = await axios.post(`${apiUrl}/add-budget-category`, {username: user.Username, category: name, percentIncomeAllocated: percent});
      alert(`${name} was added to your budget!`);

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
        alert(`Could not find budget with username: ${user.Username}`);
      }
    }
    catch (e) {
      alert(`Could not insert new budget category.`);
    }
    close();

    changeName('');
    changePercent('Percent of Post-tax income (%)')
  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Add A Category to Your Budget</h2>
        </div>
        <div className={styles.body}>
          <input value={name} placeholder='Category' type='text' onChange={(e) => {changeName(e.target.value)}}></input>
          <input value={percent} placeholder='Percent of Post-tax income (%)' type='number' min={0} step={0.01} onChange={handleNumberChange}></input>
          <button className='btn btn-primary' onClick={submitAddition}>Submit</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default AddBudgetModal;
