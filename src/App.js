import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Account from './pages/AccountManagement';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Tile from './components/Tile';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <div className='inherit'>
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
    </div>
  );
}

export default App;
