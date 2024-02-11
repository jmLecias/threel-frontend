import React from 'react';
import threel_api from './api';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        threel_api.post('/auth/register', {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                console.log(`User registered`);
                alert("User registered successfully!");
            })
            .catch(error => {
                console.error(error);
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
                        <input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            name='password'
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            name='confirmPassword'
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm Password'
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            required
                        />

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
