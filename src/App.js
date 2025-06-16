import './App.css';
import React, {useState} from "react";
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';


function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  }

  return (
    <div>
      {isLoggedIn ? (<Dashboard/>) : (
        <>
          {currentPage === 'welcome' && <WelcomePage setCurrentPage={setCurrentPage} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'signup' && <Signup onSignup={handleLogin} />}
        </>
      )}
    </div>
  )
}

export default App;
