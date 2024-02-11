import React from 'react';
import threel_api from './api';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    };

    handleChange = (event) => {
        const field = event.target.name;
        this.setState((prevState) => ({
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            }
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        threel_api.post('/auth/register', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.confirmPassword
        }).then(response => {
            console.log(`User registered`);
            console.log(response);
            alert("User registered successfully!");
        }).catch(error => {
            console.error(error.response.data.errors);
            this.setState({
                errors: error.response.data.errors,
            });
        });
    };




    render() {
        return (
            <div className="App">
                <h1 className='text-center'>THREEL</h1>
                <div className="registerContainer mx-auto my-auto">
                    <h2 className='text-center'>REGISTER</h2>
                    <form className='form-group'>
                        <input
                            name='username'
                            type='text'
                            id='username'
                            placeholder='Username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                        {this.state.errors.username && (
                            <div className="error-message">{this.state.errors.username[0]}</div>
                        )}
                        <input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        {this.state.errors.email && (
                            <div className="error-message">{this.state.errors.email[0]}</div>
                        )}
                        <input
                            name='password'
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            minLength="8"
                            required
                        />
                        {this.state.errors.password && (
                            <div className="error-message">{this.state.errors.password[0]}</div>
                        )}

                        <input
                            name='confirmPassword'
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm Password'
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            minLength="8"
                            required
                        />
                        {this.state.errors.password_confirmation && (
                            <div className="error-message">
                                {this.state.errors.password_confirmation[0]}
                            </div>
                        )}

                        <p className='mx-auto'>Already have an Account? <Link to="/login">Login Now!</Link></p>

                        <div className='mx-auto'>
                            <button type="submit" className="registerButton" onClick={this.handleSubmit}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
