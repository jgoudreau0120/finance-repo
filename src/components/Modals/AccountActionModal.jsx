import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';

const AccountActionModal = ({ action, isOpen, close }) => {
  
  switch (action) {

  }
  const submit = () => {

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