import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";


function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [state, setState] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
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
            name: state.name,
            username: state.username,
            password: state.password,
            password_confirmation: state.confirmPassword
        }

        register(credentials);

        // auth.register(credentials).then(isRegistered => {
        //     if(isRegistered) {
        //         navigate("/player");
        //     }
        // }).catch(error => {
        //     alert("Error registering: " + error);   
        //     setState(prevState => ({
        //         ...prevState,
        //         errors: error.response.data.errors,
        //     }));
        // });
    };


    return (
        <div className="App">
            <h1 className='text-center'>THREEL</h1>
            <div className="registerContainer mx-auto my-auto">
                <h2 className='text-center'>REGISTER</h2>
                <form className='form-group'>
                    <input
                        name='name'
                        type='text'
                        id='name'
                        placeholder='Name'
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.name && (
                        <div className="error-message">{state.errors.name[0]}</div>
                    )}
                    <input
                        name='username'
                        type='text'
                        id='username'
                        placeholder='Username'
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.username && (
                        <div className="error-message">{state.errors.username[0]}</div>
                    )}
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
                        minLength="8"
                        required
                    />
                    {state.errors.password && (
                        <div className="error-message">{state.errors.password[0]}</div>
                    )}

                    <input
                        name='confirmPassword'
                        id='confirm-password'
                        type='password'
                        placeholder='Confirm Password'
                        value={state.confirmPassword}
                        onChange={handleChange}
                        minLength="8"
                        required
                    />
                    {state.errors.password_confirmation && (
                        <div className="error-message">
                            {state.errors.password_confirmation[0]}
                        </div>
                    )}

                    <p className='mx-auto'>Already have an Account? <Link to="/login">Login Now!</Link></p>

                    <div className='mx-auto'>
                        <button type="submit" className="registerButton" onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
