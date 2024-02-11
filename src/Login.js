import React from 'react';
import threel_api from './api';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        threel_api.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                console.log(`User authenticated`);
                alert("User login successful!");
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
                    <h2 className='text-center'>LOGIN</h2>
                    <form className='form-group'>

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

                        <p className='mx-auto'>Don't have an Account?  <Link to="/">Register Here!</Link></p>

                        <div className='mx-auto'>
                            <button type="submit" className="registerButton" onClick={this.handleSubmit}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
