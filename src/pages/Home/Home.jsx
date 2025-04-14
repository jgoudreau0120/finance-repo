import 'bootstrap/dist/css/bootstrap.min.css';
import { useFinances } from '../../FinancialContext';
import styles from './Home.module.css';
import Tile from '../../components/Tiles/Tile';
import '../../App.css';
import IncomeChart from '../../components/Graphs/IncomeChart';
import BudgetChart from '../../components/Graphs/BudgetChart';
import { useState, useEffect } from 'react';

const Home = () => {
  const { finances } = useFinances();

  const [budgetPercentTotal, setBudgetPercentTotal] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [budgetEntries, setBudgetEntries] = useState([]);

  const [expenseEntries, setExpenseEntries] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  };

  useEffect(() => {
    let tempExpenseTotal = 0;
    let tempExpenseEntries = [];
  
    //Make calculations with expenses
    if (finances.expenses.length > 0){
      let expenses = finances.expenses;
  
      for (let i = 0; i < expenses.length; i++){
        tempExpenseTotal += (parseFloat(expenses[i].Cost));
        tempExpenseEntries.push(expenses[i]);
      }

      setExpenseEntries(tempExpenseEntries);
      setExpenseTotal(parseFloat(tempExpenseTotal));
    }
  
    let tempBudgetTotalPercent = 0;
    let tempBudgetTotal = 0;
    let tempBudgetEntries = [];

    //Make calculations with expenses
    if (finances.budgetRecords.length > 0){
      let budgets = finances.budgetRecords;

      for (let i = 0; i < budgets.length; i++){
        tempBudgetTotalPercent += budgets[i].PercentIncomeAllocated;
        tempBudgetTotal += (budgets[i].PercentIncomeAllocated / 100) * (finances.postTaxIncome - (expenseTotal * 12));
        tempBudgetEntries.push(budgets[i]);
      }

      setBudgetPercentTotal(tempBudgetTotalPercent);
      setBudgetTotal(tempBudgetTotal);
      setBudgetEntries(tempBudgetEntries);
    }
  
  }, [finances])


  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting' link='/budgeting'>
          <h4 className={budgetPercentTotal >= 100 ? styles.red : ''}>{budgetPercentTotal}% / 100%</h4>
          <h4 className={budgetPercentTotal >= 100 ? styles.red : ''}>{toUSD(budgetTotal)} / {toUSD(finances.postTaxIncome - (expenseTotal * 12))}</h4>

          <ul className={styles.expenseList}>
            {budgetEntries.map((entry) => (
              <li><h4 className={styles.name}>{entry.Category}:</h4><h4 className={styles.price}>{entry.PercentIncomeAllocated}%</h4></li>
            ))}
          </ul>

          <BudgetChart></BudgetChart>
        </Tile>

        <Tile title='Income'>
          <h4>Gross:</h4>
          <h4>
            {toUSD(finances.income)}
          </h4>
          <h4>Post-tax:</h4>
          <h4>
            {toUSD(finances.postTaxIncome)}
          </h4>
          <IncomeChart></IncomeChart>
        </Tile>

        <Tile title='Expenses'>
          <h4>
            {toUSD(expenseTotal)}/mo
          </h4>
          <ul className={styles.expenseList}>
            {expenseEntries.map((entry) => (
              <li><h4 className={styles.name}>{entry.ExpenseName}:</h4><h4 className={styles.price}>${entry.Cost}/mo</h4></li>
            ))}
          </ul>
        </Tile>

      </div>

    </div>
  )
}

export default Home;