import React, {useState} from "react";
import axios from 'axios';

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [isValidPwd, setIsValidPwd] = useState(false);
    const [error, setError] = useState('');

    const validateUsername = (username) => {
        if (username.length < 1) {
            setIsValidUsername(false);
        } else {
            setIsValidUsername(true);
        }
    };

    const validatePassword = (password) => {
        if (password.length < 1) {
            setIsValidPwd(false);
        } else {
            setIsValidPwd(true);
        }
    };

    const handleUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
        validateUsername(username); 
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        validatePassword(pwd);
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
        <div> 
            <h2>Log In!</h2>
            <form onSubmit={handleSubmit}>
                <div> 
                    <label>Username:</label><br/>
                    <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} maxLength={20} required/>
                </div>
                
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