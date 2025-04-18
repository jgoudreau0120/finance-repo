import styles from './Budgeting.module.css';
import BudgetTile from '../../components/Tiles/BudgetTile';
import { useFinances } from '../../FinancialContext';
import AddModal from '../../components/Modals/AddModal';
import DeleteModal from '../../components/Modals/DeleteModal';
import EditModal from '../../components/Modals/EditModal';
import { useState } from 'react';
import AddBudgetModal from '../../components/Modals/AddBudgetModal';
import EditBudgetModal from '../../components/Modals/EditBudgetModal';
import DeleteBudgetModal from '../../components/Modals/DeleteBudgetModal';

const Budgeting = () => {

  let budgetTotal = 0;
  let budgetEntries = [];
  const { finances, updateFinances } = useFinances();
  const [addModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);

    //Make calculations with budget to determine total percentage between
    //all categories
    if (finances.budgetRecords && finances.budgetRecords.length > 0){
      const budgets = finances.budgetRecords;
  
      for(let i = 0; i < budgets.length; i++){
        budgetTotal += (parseInt(budgets[i].PercentIncomeAllocated));
        budgetEntries.push(budgets[i]);
      }
  
    }

  return(
    <div className={styles.budgeting}>
      <div className={styles.header}>
        <h2>
          <strong>My Monthly Budget</strong>
        </h2>
        <h3 className={budgetTotal >= 100 ? styles.red : ''}>
          {budgetTotal}% / 100%
        </h3>
      </div>
      <div className={styles.budgetTileContainer}>
        
        {budgetEntries.map((entry) => (
          <BudgetTile name={entry.Category} percent={entry.PercentIncomeAllocated} key={entry.id} openDeleteModal={() => {setDeleteModalOpen(true); setCurrentBudget(entry);}} openEditModal={() => {setEditModalOpen(true); setCurrentBudget(entry);}}></BudgetTile>
        ))}
        <div className={styles.addBudgetContainer}>
          <img src='/addicon.png' className={styles.addIcon} onClick={() => {setModalOpen(true)}} alt='Add Expense Icon'/>
        </div>

        <AddBudgetModal isOpen={addModalOpen} close={() => {setModalOpen(false)}}></AddBudgetModal>
        <DeleteBudgetModal isOpen={deleteModalOpen} budgetEntry={currentBudget} close={() => {setDeleteModalOpen(false)}}></DeleteBudgetModal>
        <EditBudgetModal isOpen={editModalOpen} budgetEntry={currentBudget} close={() => {setEditModalOpen(false)}}></EditBudgetModal>
      </div>

      

    </div>
  )
}

export default Budgeting;