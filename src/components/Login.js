import React, {useState} from 'react';
import axios from 'axios';
import {setUserSession} from '../utils/Common';
import {NavLink} from 'react-router-dom';

function Login(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        doLogin();
    }

    const doLogin = () => {
        axios
            .post(process.env.REACT_APP_BE_HOST+'/api/auth/login', {
                username: username.value,
                password: password.value
            })
            .then(response => {
                setLoading(false);
                getUserData(response.data.access_token)
                return response.data.access_token
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) 
                    setError(error.response.data);
                else 
                    setError("Something went wrong. Please try again later.");
                }
            );
    }

    const getUserData = (accessToken) => {
        axios
            .get(process.env.REACT_APP_BE_HOST+'/api/profile', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(response => {
                setUserSession(accessToken, response.data);
                props
                    .history
                    .push('/dashboard');
                return response.data
            })
            .catch(error => {
                return error
            });
    }

    const redirectToRegister = () => {
        props
            .history
            .push('/signup');
    }

    return (
        <div>
            Login<br/><br/>
            <div>
                Username<br/>
                <input type="text" {...username} autoComplete="new-password"/>
            </div>
            <div style={{
                    marginTop: 10
                }}>
                Password<br/>
                <input type="password" {...password} autoComplete="new-password"/>
            </div>
            {
                error && <> < small style = {{ color: 'red' }} > {
                    error
                }
                </small><br/></>
            }<br/>
            <input
                type="button"
                value={loading
                    ? 'Loading...'
                    : 'Login'}
                onClick={handleLogin}
                disabled={loading}/><br/>
            <NavLink onClick={redirectToRegister} to="/signup">Sign Up</NavLink>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {value, onChange: handleChange}
}

export default Login;