import React, {useState} from "react";
import Login from './Login';
import Signup from './Signup';
import './WelcomePage.css';

function WelcomePage({onLogin}) {
    const [isLogin, setIsLogin] = useState(true);

    const handleSignupSuccess = () => {
        setIsLogin(true);
    };

    return (
        <div className="welcome-container">
            <div className="left-card">
                {isLogin ? (
                    <>
                        <Login onLogin={onLogin} />
                        <p className="toggle-text">
                            New user?{' '}
                            <span onClick={() => setIsLogin(false)} className="toggle-link">Sign up</span>
                        </p>
                    </>
                ) : (
                    <>
                        <Signup onSignup={handleSignupSuccess} />
                        <p className="toggle-text">
                            Already have an account?{' '}
                            <span onClick={() => setIsLogin(true)} className="toggle-link">Log in</span>
                        </p>
                    </>
                )}
            </div>

            <div className="right-info">
                <h1>Welcome to your Personal Finance Tracker!</h1>
                <p>This tool helps you monitor expenses, track savings, and plan your financial goals effectively. Everything in one place, just for you.</p>
                <p className="login-prompt">Log in to continue.</p>
            </div>
        </div>
    )
}

export default WelcomePage;