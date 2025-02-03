import styles from './CreateUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUser = () => {
  return(
    <div className={styles.background}>
      <div className={styles.container}>
        <div className='row'>
          <div className='col'>
            <label>First Name</label>
          </div>
          <div className='col'>
            <input placeholder='First Name'></input>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <label>Last Name</label>
          </div>
          <div className='col'>
            <input placeholder='Last Name'></input>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser;