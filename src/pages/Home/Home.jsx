import 'bootstrap/dist/css/bootstrap.min.css';
import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import styles from './Home.module.css';
import Tile from '../../components/Tiles/Tile';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import IncomeChart from '../../components/Graphs/IncomeChart';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();
  const navigate = useNavigate();

  let expenseTotal = 0;
  let expenseEntries = [];

  //Make calculations with expenses
  if (finances.expenses.length > 0){
    const expenses = finances.expenses;

    for(let i = 0; i < expenses.length; i++){
      expenseTotal += (parseFloat(expenses[i].Cost));
      expenseEntries.push(expenses[i]);
    }

    expenseTotal = parseFloat(expenseTotal.toFixed(2));
  }

  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting' link='/budgeting'>

        </Tile>

        <Tile title='Income'>
          <div>
            <h4>
              {parseFloat(finances.income).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </h4>
          </div>
        </Tile>

        <Tile title='Expenses'>
          <h4>
            {parseFloat(expenseTotal).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </h4>
          <ol>
            {expenseEntries.map((entry) => (
              <li>{entry.ExpenseName}: ${entry.Cost}/mo</li>
            ))}
          </ol>
        </Tile>

        
      </div>

      <div className={styles.chartRow}>
        <IncomeChart postTaxIncomeTotal={100000}></IncomeChart>
      </div>

    </div>
  )
}

export default Home;