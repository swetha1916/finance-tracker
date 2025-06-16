import React, {useState} from "react";
import axios from 'axios';

function Signup({onSignup}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


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
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={20} required/>
                    <small style={{color:'gray'}}>Max 20 characters</small>
                </div>

                <button type="submit">Sign up</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Signup;