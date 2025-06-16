import React, {useState} from "react";
import axios from 'axios';

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>
            {error && <p stype={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Login;