import 'bootstrap/dist/css/bootstrap.min.css';
import { useFinances } from '../../FinancialContext';
import styles from './Home.module.css';
import Tile from '../../components/Tiles/Tile';
import '../../App.css';
import IncomeChart from '../../components/Graphs/IncomeChart';
import BudgetChart from '../../components/Graphs/BudgetChart';

const Home = () => {
  const { finances } = useFinances();

  const toUSD = (float) => {
    let value = '';
    value = parseFloat(float).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return value;
  };

  let expenseTotal = 0;
  let expenseEntries = [];

  //Make calculations with expenses
  if (finances.expenses.length > 0){
    const expenses = finances.expenses;

    for(let i = 0; i < expenses.length; i++){
      expenseTotal += (parseFloat(expenses[i].Cost));
      expenseEntries.push(expenses[i]);
    }

    expenseTotal = parseFloat(expenseTotal);
  }

  let budgetTotalPercent = 0;
  let budgetTotal = 0;
  let budgetEntries = [];
  //Make calculations with expenses
  if (finances.budgetRecords.length > 0){
    let budgets = finances.budgetRecords;
    for(let i = 0; i < budgets.length; i++){
      budgetTotalPercent += budgets[i].PercentIncomeAllocated;
      budgetTotal += (budgets[i].PercentIncomeAllocated / 100) * (finances.postTaxIncome - (expenseTotal * 12));
      budgetEntries.push(budgets[i]);
    }
  }


  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting' link='/budgeting'>
          <h4>{budgetTotalPercent}% / 100%</h4>
          <h4>{toUSD(budgetTotal)} / {toUSD(finances.postTaxIncome - (expenseTotal * 12))}</h4>

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
          <IncomeChart postTaxIncomeTotal={finances.postTaxIncome} totalIncomeTax={(finances.income - finances.postTaxIncome)}></IncomeChart>
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