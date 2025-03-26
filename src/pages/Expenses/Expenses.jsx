import styles from './Expenses.module.css';
import ExpenseTile from '../../components/Tiles/ExpenseTile';
import { useFinances } from '../../FinancialContext';
import Tile from '../../components/Tiles/Tile';
import AddModal from '../../components/Modals/AddModal';
import { useState } from 'react';

const Expenses = () => {

  let expenseTotal = 0;
  let expenseEntries = [];
  const { finances } = useFinances();
  const [addModalOpen, setModalOpen] = useState(false);

  //Make calculations with expenses
  if (finances.expenses.length > 0){
    const expenses = finances.expenses;

    for(let i = 0; i < expenses.length; i++){
      expenseTotal += (parseFloat(expenses[i].Cost));
      expenseEntries.push(expenses[i]);
    }

    expenseTotal = parseFloat(expenseTotal.toFixed(2));
  }

  return(
    <div className={styles.expenses}>
      <div className={styles.header}>
        <h2>
          My Monthly Expenses
        </h2>
        <h3>
          {parseFloat(expenseTotal).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </h3>
      </div>
      <div className={styles.expenseTileContainer}>
        
        {expenseEntries.map((entry) => (
          <ExpenseTile name={entry.ExpenseName} cost={entry.Cost} key={entry.id}></ExpenseTile>
        ))}
        <div className={styles.addExpenseContainer}>
          <img src='/addicon.png' className={styles.addIcon} onClick={() => {setModalOpen(true)}} alt='Add Expense Icon'/>
        </div>

        <AddModal isOpen={addModalOpen} close={() => {setModalOpen(false)}}></AddModal>
      </div>

      

    </div>
  )
}

export default Expenses;