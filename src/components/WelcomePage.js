import React from "react";

function WelcomePage({setCurrentPage}) {
    return (
        <div>
            <h1>Welcome to your personal Finance Tracker!</h1>
            
            <button onClick={() => setCurrentPage('login')}>Log in</button>
            <button onClick={() => setCurrentPage('signup')}>Sign up</button>
        </div>
    )
}

export default WelcomePage;