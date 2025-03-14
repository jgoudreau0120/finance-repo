import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import styles from './Home.module.css';
import Tile from '../../components/Tile/Tile';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();

  return (
    <div>
      <h1>Welcome {user ? user.FirstName : "Guest"}!</h1>
      <Tile title='Budgeting'></Tile>
      <Tile title='Income'>
        <div>Your Yearly Income: ${finances.income}</div>
      </Tile>
      <Tile title='Expenses'></Tile>
    </div>
  )
}

export default Home;