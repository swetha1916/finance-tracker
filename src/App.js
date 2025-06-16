import './App.css';
import React, {useState} from "react";
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';


function App() {
  const [page, setPage] = useState('login');
  const[signupSuccess, setSignupSuccess] = useState(false);

  const handleLoginSuccess = () => {
    alert("Log in successful!")
    setPage('dashboard');
  }

  const handleSignupSuccess = () => {
    alert("Sign up successful!")
    setSignupSuccess(true);
    setPage('login');
  }

  return (
    <div>
      {page === 'login' && (
        <>
          <Login onLogin={handleLoginSuccess} />
          <p>New user? <button onClick={() => setPage('signup')}>Sign up</button></p>
        </>
      )}

      {page === 'signup' && (
        <>
          <Signup onSignup={handleSignupSuccess} />
          <p>Already have an account? <button onClick={() => setPage('login')}>Log in</button></p>  
        </>
      )}

      {page === 'dashboard' && (
        <Dashboard/>
      )}
    </div>
  )
}

export default App;
