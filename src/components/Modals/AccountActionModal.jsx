import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import { useUser } from '../../UserContext';

const AccountActionModal = ({ action, isOpen, close }) => {
  const { user } = useUser();
  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/delete-data`, {username: user.Username, data: action});
      
      fetchFinances(user.Username);
      
      alert(`${data} data cleared.`);
    }
    catch (e) {
      alert(`Could not delete data.`);
    }
    close();
  }

  if(!isOpen){
    return null;
  }

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Are you sure you want to delete all {action} data?</h2>
        </div>
        <div className={styles.body}>
          <button className='btn btn-primary' onClick={submit}>Yes</button>
          <button className='btn btn-secondary' onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AccountActionModal;