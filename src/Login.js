import React, { useState } from 'react';
import threel_api from './api';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
        submitting: false, // State to track form submission
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState(prevState => ({ ...prevState, submitting: true }));
        console.log(state);
        try {
            const response = await threel_api.post('/auth/login', {
                email: state.email,
                password: state.password
            });
            toast.success("Login successfully", {
                autoClose:  500,
                onClose: () => navigate("/player")
            });
        } catch (error) {
            console.error(error);
            setState(prevState => ({
                ...prevState,
                errors: error.response.data.errors,
            }));
        } finally {
            setState(prevState => ({ ...prevState, submitting: false }));
        }
    };

    return (
        <div className="App">
            <ToastContainer />
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
                    <p className='mx-auto'>Don't have an Account? <Link to="/register">Register Here!</Link></p>
                    <div className='mx-auto'>
                        <button className="registerButton" onClick={handleSubmit} disabled={state.submitting}>
                            {state.submitting ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
