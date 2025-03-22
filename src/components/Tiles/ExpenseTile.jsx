import styles from './ExpenseTile.module.css';

const ExpenseTile = ({name, cost}) => {
  
  return(
    <div className={styles.expenseTile}>

      <div className='info'>
        <h3>{name}</h3>
        <h3>
          {parseFloat(cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </h3>
      </div>

      <div className={styles.actionContainer}>
        <img src='/editicon.png' className={styles.editButton} alt='Edit Icon'/>
        <img src='/deleteicon.png' className={styles.deleteButton} alt='Delete Icon'/>
      </div>

    </div>
  )
}

export default ExpenseTile;