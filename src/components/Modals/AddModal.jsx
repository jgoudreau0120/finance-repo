import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useFinances } from '../../FinancialContext';

const AddModal = ({isOpen, close}) => {
  const [name, changeName] = useState('');
  const [cost, changeCost] = useState('Cost (without $)');
  const { user } = useUser();
  const{ updateFinances, finances } = useFinances();

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

    changeCost(parseFloat(currentInputNumber));
    
  }

  const submitAddition = async () => {
    //Pull income
    try {
      const response = await axios.post(`${apiUrl}/add-expense`, {username: user.Username, description: name, cost: cost});
      alert(`${name} was added to your expenses!`);

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

      changeName('');
      changeCost('Cost (without $)');
    }
    catch (e) {
      alert(`Could not insert new expense`);
    }
  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Add An Expense</h2>
        </div>
        <div className={styles.body}>
          <input value={name} placeholder='Name' type='text' onChange={(e) => {changeName(e.target.value)}}></input>
          <input value={cost} placeholder='Cost (without $)' type='number' min={0} step={0.01} onChange={handleNumberChange}></input>
          <button className='btn btn-primary' onClick={submitAddition}>Submit</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default AddModal;
