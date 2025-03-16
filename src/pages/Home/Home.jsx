import 'bootstrap/dist/css/bootstrap.min.css';
import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import styles from './Home.module.css';
import Tile from '../../components/Tile/Tile';
import '../../App.css';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();
  let expenseTotal = 0;
  let expenseEntries = [];

  //Make calculations with expenses
  if (finances.expenses.length > 0){
    const expenses = finances.expenses;

    for(let i = 0; i < expenses.length; i++){
      expenseTotal += (parseFloat(expenses[i].Cost));
      expenseEntries.push(expenses[i]);
    }
  }

  //Sort expenses
  let tmp = 0;
  for(let i = 0; i < expenseEntries.length; i++){

  }
  

  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting'>

        </Tile>

        <Tile title='Income'>
          <div>
            Your Yearly Income: ${finances.income}
          </div>
          
        </Tile>

        <Tile title='Expenses'>
          <h4>${expenseTotal}</h4>
          <ol>
            {expenseEntries.map((entry) => (
              <li>{entry.ExpenseName}: ${entry.Cost}/mo</li>
            ))}
          </ol>
        </Tile>

        
      </div>
      {/* <div className={styles.tileRow}>
        <Tile title='Tile 1'>

        </Tile>

        <Tile title='Tile 2'>

        </Tile>

        <Tile title='Tile 3'>

        </Tile>
      </div> */}

    </div>
  )
}

export default Home;