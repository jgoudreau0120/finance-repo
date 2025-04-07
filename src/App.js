import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Account from './pages/AccountManagement/AccountManagement';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import CreateUser from './pages/CreateUser/CreateUser';
import IncomeTracking from './pages/IncomeTracking/IncomeTracking';
import Expenses from './pages/Expenses/Expenses';
import Budgeting from './pages/Budgeting/Budgeting';
import './App.css';
import { UserProvider } from './UserContext';
import { FinancialProvider } from './FinancialContext';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className='inherit'>
      <UserProvider>
        <FinancialProvider>
          <Router>
            <Navbar />
            <div className='main'>
              <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/myAccount' element={<Account/>}></Route>
                <Route path='/settings' element={<Settings/>}></Route>
                <Route path='/createUser' element={<CreateUser/>}></Route>
                <Route path='/budgeting' element={<Budgeting/>}></Route>
                <Route path='/income' element={<IncomeTracking/>}></Route>
                <Route path='/expenses' element={<Expenses/>}></Route>
              </Routes>
            </div>
          </Router>
        </FinancialProvider>
      </UserProvider>
    </div>
  );
}

export default App;
