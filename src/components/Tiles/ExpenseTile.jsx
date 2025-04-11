import styles from './ExpenseTile.module.css';

const ExpenseTile = ({name, cost, key, openDeleteModal, openEditModal}) => {

  return(
    <div className={styles.expenseTile}>

      <div>
        <h3>{name}</h3>
        <h3>
          {parseFloat(cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </h3>
      </div>

      <div className={styles.actionContainer}>
        <img src='/editicon.png' className={styles.editButton} onClick={openEditModal} alt='Edit Icon'/>
        <img src='/deleteicon.png' className={styles.deleteButton} onClick={openDeleteModal} alt='Delete Icon'/>
      </div>

    </div>
  )
}

export default ExpenseTile;