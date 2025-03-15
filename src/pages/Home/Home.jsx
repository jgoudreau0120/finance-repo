import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';

import styles from './Home.module.css';
import Tile from '../../components/Tile/Tile';
import '../../App.css';

const Home = () => {
  const { user } = useUser();
  const { finances } = useFinances();

  return (
    <div className={styles.home}>
      <div className={styles.tileRow}>
        <Tile title='Budgeting'>

        </Tile>

        <Tile title='Income'>
          <div className='row'>
            Your Yearly Income: ${finances.income}
          </div>
          
        </Tile>

        <Tile title='Expenses'>

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