import styles from './Expenses.module.css';
import ExpenseTile from '../../components/Tiles/ExpenseTile';
import { useFinances } from '../../FinancialContext';

const Expenses = () => {

  let expenseTotal = 0;
  let expenseEntries = [];
  const { finances } = useFinances();

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
        
      </div>
      
    </div>
  )
}

export default Expenses;