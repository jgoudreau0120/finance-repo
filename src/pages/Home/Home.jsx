import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();

  return (
    <div>
      <h1>Welcome {user ? user.FirstName : "Guest"}!</h1>
    </div>
  )
}

export default Home;