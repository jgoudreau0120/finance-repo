import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Account from './pages/AccountManagement/AccountManagement';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Tile from './components/Tile/Tile';
import CreateUser from './pages/CreateUser/CreateUser';
import './App.css';
import { UserProvider } from './UserContext';
import { FinancialProvider } from './FinancialContext';

function App() {
  return (
    <div className='inherit'>
      <UserProvider>
        <FinancialProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/myAccount' element={<Account/>}></Route>
              <Route path='/settings' element={<Settings/>}></Route>
              <Route path='/createUser' element={<CreateUser/>}></Route>
            </Routes>
          </Router>
        </FinancialProvider>
      </UserProvider>
    </div>
  );
}

export default App;
