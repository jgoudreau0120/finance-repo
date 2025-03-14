import styles from './Tile.module.css';
import { useFinances } from '../../FinancialContext';
import { useUser } from '../../UserContext';
import classNames from 'classnames';
const Tile = ({ title, children }) => {

  const { finances } = useFinances();
  
  return(
    <div className={styles.tile}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Tile;