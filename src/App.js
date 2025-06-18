import './App.css';
import React, {useState} from "react";
import Dashboard from './components/Dashboard';
import WelcomePage from './components/WelcomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? 
      <Dashboard onLogout={handleLogout} /> 
      : 
      <WelcomePage onLogin={handleLoginSuccess} />}
    </div>
  );
}

export default App;
