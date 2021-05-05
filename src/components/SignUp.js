import React, {useState} from 'react';
import axios from 'axios';

function SignUp(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const username = useFormInput('');
    const firstname = useFormInput('');
    const lastname = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    const handleSignUp = () => {
        setError(null);
        setLoading(true);
        doSignUp();
    }

    const validate = () => {
        if (email.value === null || email.value === "") {
            setError("Email cannot be empty")
            setLoading(false);
            return false
        }
        if (username.value === null || username.value === "") {
            setError("Username cannot be empty")
            setLoading(false);
            return false
        }
        if (firstname.value === null || firstname.value === "") {
            setError("First name cannot be empty")
            setLoading(false);
            return false
        }
        if (password.value === null || password.value === "") {
            setError("Password cannot be empty")
            setLoading(false);
            return false
        }
    }

    const doSignUp = () => {
        if (validate() === false) {
            return
        }
        axios
            .post('http://localhost:4000/api/auth/signup', {
                email: email.value,
                username: username.value,
                firstname: firstname.value,
                lastname: lastname.value,
                password: password.value
            })
            .then(response => {
                setLoading(false);
                props
                    .history
                    .push('/login');
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

    return (
        <div>
            Sign Up<br/><br/>
            <div>
                Email<br/>
                <input type="text" {...email} autoComplete="new-password" required/>
            </div>
            <div style={{
                    marginTop: 10
                }}>
                Username<br/>
                <input type="text" {...username} autoComplete="new-password"/>
            </div>

            <div style={{
                    marginTop: 10
                }}>
                First Name<br/>
                <input type="text" {...firstname} autoComplete="new-password"/>
            </div>

            <div style={{
                    marginTop: 10
                }}>
                Last Name<br/>
                <input type="text" {...lastname} autoComplete="new-password"/>
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
                    : 'Register'}
                onClick={handleSignUp}
                disabled={loading}/><br/>
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
export default SignUp;