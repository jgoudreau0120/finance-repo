import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { useState } from 'react';

const AddModal = () => {
  const [name, changeName] = useState('');
  const [cost, changeCost] = useState(0);

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

  const submitAddition = () => {
    
  }

  return(
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2>Add An Expense</h2>
      </div>
      <div className={styles.body}>
        <input placeholder='Name' type='text' onChange={(e) => {changeName(e.target.value)}}></input>
        <input placeholder='Cost' type='number' min={0} step={0.01} onChange={handleNumberChange}></input>
        <button className='btn btn-primary' onClick={submitAddition}>Submit</button>
      </div>
      
    </div>
  )
}

export default AddModal;
