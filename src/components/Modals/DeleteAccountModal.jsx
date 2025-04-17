import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({isOpen, close}) => {

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const apiUrl = 'https://saqarapux2.us-east-2.awsapprunner.com';

  const submitDeletion = async () => {

    try {
      const response = await axios.post(`${apiUrl}/delete-account`, {username: user.Username});
      alert(`Account deleted.`);
      localStorage.clear();
      setUser(null);
      window.location.href = '/';
    }
    catch (e) {
      alert(`Could not delete account.`);
    }

  }

  if(!isOpen)
    return null;

  return(
    <div className={styles.modalOverlay} onClick={close}>
      <div className={styles.modal} onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.header}>
          <h2>Account Deletion Confirmation</h2>
        </div>
        <div className={styles.body}>
          <h5>Are you sure you want to delete your account?</h5>
          <button className='btn btn-danger' onClick={submitDeletion}>Delete</button>
          <button className='btn btn-secondary' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal;
