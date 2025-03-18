import styles from './Tile.module.css';
import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

const Tile = ({ title, children, className }) => {

  const { finances } = useFinances();
  const navigate = useNavigate();
  let titleLink = '/';

  switch(title){
    case 'Budgeting':
      titleLink = '/budgeting';
      break;
    case 'Income':
      titleLink = '/income';
      break;
    case 'Expenses':
      titleLink = '/expenses';
      break;
  }

  return(
    <div className={styles.tile}>
      <div className={styles.header}>
        <h3 onClick={() => navigate(`${titleLink}`)}>{title}</h3>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Tile;