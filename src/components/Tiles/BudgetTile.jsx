import styles from './BudgetTile.module.css';
import { useFinances } from '../../FinancialContext';

const BudgetTile = ({ name, percent, key, openDeleteModal, openEditModal }) => {
  const { finances } = useFinances();

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

  return(
    <div className={styles.budgetTile}>

      <div>
        <h3>{name}</h3>
        <h3>{percent}%</h3>
      </div>

      <div>
        <h3>{toUSD(((finances.postTaxIncome / 12 - expensesTotal) * (percent / 100)).toFixed(2))}</h3>
      </div>

      <div className={styles.actionContainer}>
        <img src='/editicon.png' className={styles.editButton} onClick={openEditModal} alt='Edit Icon'/>
        <img src='/deleteicon.png' className={styles.deleteButton} onClick={openDeleteModal} alt='Delete Icon'/>
      </div>

    </div>
  )
}

export default BudgetTile;