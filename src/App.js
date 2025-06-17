import './App.css';
import React, {useState} from "react";
import Dashboard from './components/Dashboard';
import WelcomePage from './components/WelcomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <WelcomePage onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
