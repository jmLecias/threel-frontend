import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

function Login() {
    const navigate = useNavigate();
    const auth = new AuthenticationService();

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
    });

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            email: state.email,
            password: state.password
        }

        auth.login(credentials).then(isLoggedIn => {
            if(isLoggedIn) {
                navigate("/player");
            }
        }).catch(error => {
            alert("Error logging in" + error);   
        });
    };

    return (
        <div className="App">
            <h1 className='text-center'>THREEL</h1>
            <div className="registerContainer mx-auto my-auto">
                <h2 className='text-center'>LOGIN</h2>
                <form className='form-group'>

                    <input
                        name='email'
                        type='email'
                        id='email'
                        placeholder='Email'
                        value={state.email}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.email && (
                        <div className="error-message">{state.errors.email[0]}</div>
                    )}
                    <input
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Password'
                        value={state.password}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.password && (
                        <div className="error-message">{state.errors.password[0]}</div>
                    )}

                    <p className='mx-auto'>Don't have an Account?  <Link to="/register">Register Here!</Link></p>

                    <div className='mx-auto'>
                        <button className="registerButton" onClick={handleSubmit}>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
