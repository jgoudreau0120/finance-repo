import styles from './ExpenseTile.module.css';

const ExpenseTile = ({name, cost}) => {
  
  return(
    <div className={styles.expenseTile}>
      {name}: {cost}
    </div>
  )
}

export default ExpenseTile;