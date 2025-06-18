import React, {useState} from "react";
import axios from 'axios';
import './Login.css';

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [isValidPwd, setIsValidPwd] = useState(false);
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
        setIsValidUsername(username.length > 0);
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        setIsValidPwd(pwd.length > 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/login', {username, password});
            onLogin();
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials');
            } else {
                setError('Log in failed');
            }
        } 
    };

    // get the username and password, and submit to login
    return (
        <div className="login-container"> 
            <h2>Log In!</h2>
            <form onSubmit={handleSubmit}>
                <div> 
                    <label>Username:</label><br/>
                    <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} maxLength={20} required/>
                </div><br/>
                
                <div>
                    <label>Password:</label><br/>
                    <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange} maxLength={20} required/>
                </div>

                <button type="submit" disabled={!isValidPwd || !isValidUsername}>Log in</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Login;