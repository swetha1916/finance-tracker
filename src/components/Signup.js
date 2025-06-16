import React, {useState} from "react";
import axios from 'axios';

function Signup({onSignup}) {
    const [username, setUsername] = useState('');
    const [usernameValidationMsg, setUsernameValidationMsg] = useState('');
    const [isValidUsername, setIsValidUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pwdValidationMsg, setPwdValidationMsg] = useState("");
    const [isValidPwd, setIsValidPwd] = useState(false);
    const [error, setError] = useState('');

    // Regular expression for at least 1
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    const validateUsername = (username) => {
        if (username.length < 5) {
            setUsernameValidationMsg("Username is too short.")
            setIsValidUsername(false);
        } else {
            setUsernameValidationMsg("Username meets all conditions.")
            setIsValidUsername(true);
        }
    };

    const validatePassword = (pwd) => {
        if (pwd.length < 8) {
            setPwdValidationMsg("Password is too short.");
            setIsValidPwd(false);
        } else if (!hasNumber.test(pwd)) {
            setPwdValidationMsg("Password is missing a numerical character.");
            setIsValidPwd(false);
        } else if (!hasSpecialChar.test(pwd)) {
            setPwdValidationMsg("Password is missing a special character.");
            setIsValidPwd(false);
        } else {
            setPwdValidationMsg("Password meets all conditions.");
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
            await axios.post('http://localhost:5000/signup', {username, password});
            onSignup();
        } catch (err) {
            if (err.response && error.response.status === 400) {
                setError('Username already exists'); 
            } else {
                setError('Sign up failed');
            }
        }
    };

    return (
        <div> 
            <h2>Sign up!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label><br/>
                    <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} maxLength={20} required/>
                    <small style={{color:'gray'}}>Max 20 characters</small>
                    <small style={{ display: 'block', marginTop: 5 }}>
                        Username rules:
                        <ul style={{ marginTop: 5, marginBottom: 5 }}>
                            <li>Must be at least 5 characters long</li>
                        </ul>
                    </small>
                    <div style={{ color: usernameValidationMsg === "Username meets all conditions." ? 'green' : 'red', marginTop: 5 }}>
                    {usernameValidationMsg}
                    </div>
                </div>

                <div>
                    <label>Password:</label><br/>
                    <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange} maxLength={20} required/>
                    <small style={{color:'gray'}}>Max 20 characters</small><br/>
                    <small style={{ display: 'block', marginTop: 5 }}>
                        Password rules:
                        <ul style={{ marginTop: 5, marginBottom: 5 }}>
                            <li>Must include at least 1 number</li>
                            <li>Must include at least 1 special character (!@#$%^&*(),.?":{}\|)</li>
                            <li>Must be at least 8 characters long</li>
                        </ul>
                    </small>
                    <div style={{ color: pwdValidationMsg === "Password meets all conditions." ? 'green' : 'red', marginTop: 5 }}>
                    {pwdValidationMsg}
                    </div>
                </div>

                <button type="submit" disabled={!isValidPwd || !isValidUsername}>Sign up</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Signup;