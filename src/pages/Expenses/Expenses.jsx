import styles from './Expenses.module.css';
import ExpenseTile from '../../components/Tiles/ExpenseTile';
import { useFinances } from '../../FinancialContext';
import Tile from '../../components/Tiles/Tile';
import AddModal from '../../components/Modals/AddModal';
import { useState } from 'react';
import DeleteModal from '../../components/Modals/DeleteModal';
import EditModal from '../../components/Modals/EditModal';

const Expenses = () => {

  let expenseTotal = 0;
  let expenseEntries = [];
  const { finances } = useFinances();
  const [addModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

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
          <strong>My Monthly Expenses</strong>
          
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
          <ExpenseTile name={entry.ExpenseName} cost={entry.Cost} key={entry.id} openDeleteModal={() => {setDeleteModalOpen(true); setCurrentExpense(entry);}} openEditModal={() => {setEditModalOpen(true); setCurrentExpense(entry);}}></ExpenseTile>
        ))}
        <div className={styles.addExpenseContainer}>
          <img src='/addicon.png' className={styles.addIcon} onClick={() => {setModalOpen(true)}} alt='Add Expense Icon'/>
        </div>

        <AddModal isOpen={addModalOpen} close={() => {setModalOpen(false)}}></AddModal>
        <DeleteModal isOpen={deleteModalOpen} expense={currentExpense} close={() => {setDeleteModalOpen(false)}}></DeleteModal>
        <EditModal isOpen={editModalOpen} expense={currentExpense} close={() => {setEditModalOpen(false)}}></EditModal>
      </div>

      

    </div>
  )
}

export default Expenses;