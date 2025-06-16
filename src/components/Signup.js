import React, {useState} from "react";
import axios from 'axios';

function Signup({onSignup}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');

    // Regular expression for at least 1
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    const validatePassword = (pwd) => {
        if (pwd.length < 8) {
            setValidationMsg("Password is too short.");
        } else if (!hasNumber.test(pwd)) {
            setValidationMsg("Password is missing a numerical character.");
        } else if (!hasSpecialChar.test(pwd)) {
            setValidationMsg("Password is missing a special character.");
        } else {
            setValidationMsg("Password meets all conditions.");
            setIsValid(true);
        }   
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
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20} required/>
                    <small style={{color:'gray'}}>Max 20 characters</small>
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
                    <div style={{ color: validationMsg === "Password meets all conditions." ? 'green' : 'red', marginTop: 5 }}>
                    {validationMsg}
                    </div>
                </div>

                <button type="submit" disabled={!isValid}>Sign up</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Signup;