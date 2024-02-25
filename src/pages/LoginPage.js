import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loader, loaderOn] = useState("Log in");

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

        loaderOn("Logging in...");

        login(credentials).then((isLoggedIn) => {
            if (isLoggedIn === true) {
                navigate("/home", { replace: true });
                loaderOn("Log in");
            }
        }).catch((error) => {
            loaderOn("Log in");
            toast.error("Login error!\n", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });


    };

    return (
        <>
            {/* <Modal /> */}
            <div className="App">
                <ToastContainer />

                <div className="con-padlog mx-auto my-auto">
                    <Container className="text-center bg-prim rounded-3 col-md-5">
                        <h1 className="text-maroon">THREEL</h1>
                        <Row className="justify-content-center mt-3">
                            <Col md={6}>
                                <h2 className="text-white">Login</h2>
                                <Form className='mb-3'>

                                    <input
                                        name='email'
                                        type='email'
                                        id='email'
                                        placeholder='Email'
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                        className="form-control mb-3"
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
                                        className="form-control mb-3"
                                    />
                                    {state.errors.password && (
                                        <div className="error-message">{state.errors.password[0]}</div>
                                    )}

                                    <p className='mx-auto'>Don't have an Account? <Link to="/register" className="text-white fst-italic fw-bold">Register Here!</Link></p>

                                    <button type="submit" className="btn btn-lg custom-btn-prim" onClick={handleSubmit} disabled={loader === "Logging in..."}>
                                        <h6 className='my-auto mx-auto text-white'>{loader}</h6>
                                        {loader === "Logging in..." && <Spinner animation="border" size='sm' />}
                                    </button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Login;
