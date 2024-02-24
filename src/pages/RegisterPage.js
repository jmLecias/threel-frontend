import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [loader, loaderOn] = useState("Register");

    const [show, setShow] = useState(true);

    const [didAgree, setDidAgree] = useState(false);

    const [accountType, setAccountType] = useState("");

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

        loaderOn("Registering...");

        if (didAgree) {
            register(credentials).then((isRegistered) => {
                if (isRegistered === true) {
                    navigate("/home", { replace: true });
                    loaderOn("Register");
                }
            }).catch((error) => {
                setState(prevState => ({
                    ...prevState,
                    errors: error.response.data.errors,
                }));
                loaderOn("Register");
            });
        } else {
            toast.error("Did not accept user agreement", {
                autoClose: 3000,
                pauseOnHover: true,
            });
            loaderOn("Register");
        }
    };


    return (
        <div className="App">
            <ToastContainer />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="modal-title">User Agreement</h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="modal-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam excepturi corrupti doloremque accusantium id ratione ipsa veniam eum magnam soluta molestias accusamus, maiores tenetur quae temporibus aperiam, sint expedita illum, libero error deserunt maxime omnis vero. Quis, iste. Dignissimos quidem repellat architecto expedita atque, nam fuga nihil maxime ducimus dolorem magnam in quae cum animi exercitationem et velit? Est vitae repellat, ratione, necessitatibus facilis veritatis, saepe tempore accusamus magni deleniti itaque aliquid rem! Ea laborum soluta et minima animi maiores unde aliquid modi quod quasi minus quae exercitationem earum pariatur iste, quisquam dolores magnam possimus sapiente excepturi nihil quibusdam, labore eius nam. Iure, repellendus! Voluptates eveniet, doloribus voluptatibus enim non rerum provident modi fuga possimus cumque quis. Ea laudantium eaque vitae, neque consequatur mollitia tempore numquam nam rerum amet porro aspernatur. Quam officiis sint atque placeat amet repudiandae corrupti totam ab vel perferendis cum dicta, sunt id autem tempore earum tenetur quas, blanditiis, dignissimos minima. Harum inventore, fuga placeat deleniti animi nulla repellat ducimus, ipsa eius mollitia magni atque sint, nesciunt deserunt iure quaerat? Doloremque earum culpa aliquid maiores. Quis odit, eius exercitationem et in praesentium obcaecati ex doloribus, nostrum dolorum totam harum, reprehenderit autem nobis vitae molestias explicabo. Id cupiditate dolore soluta, reiciendis unde doloremque perspiciatis nemo sapiente laudantium ratione impedit voluptatibus delectus, eligendi corrupti exercitationem, adipisci eum! Quae aliquid hic tempora consequatur, debitis exercitationem ut natus! A, corrupti aut. Eos tempore veniam sunt? Aliquam praesentium, unde illum laboriosam, facere numquam consectetur sint ducimus in neque distinctio fugit accusantium nisi cumque suscipit, rem beatae aliquid quas dolorum doloribus esse error ut dolores?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            navigate("/login");
                        }
                        }
                    >Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShow(false);
                            setDidAgree(true);
                        }
                        }
                    >Accept</Button>
                </Modal.Footer>
            </Modal>
            <div className="con-padreg">
                <Container className="text-center bg-prim rounded-3 col-md-5">
                    <h1 className="text-maroon">THREEL</h1>
                    <Row className="justify-content-center mt-3">
                        <Col md={6}>
                            <h2 className="text-white">REGISTER</h2>
                            <Form className='mb-3'>
                                <input
                                    name='name'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={state.name}
                                    onChange={handleChange}
                                    required
                                    className="form-control mb-3"
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
                                    className="form-control mb-3"
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
                                    minLength="8"
                                    required
                                    className="form-control mb-3"
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
                                    className="form-control mb-3"
                                />
                                {state.errors.password_confirmation && (
                                    <div className="error-message">
                                        {state.errors.password_confirmation[0]}
                                    </div>
                                )}

                                <select name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} className="form-select mb-3">
                                    <option value="" disabled selected>Account Type</option>
                                    <option value="listener">Listener</option>
                                    <option value="artist">Artist</option>
                                </select>

                                <p className='mx-auto'>Already have an Account? <Link to="/login" className="text-white fst-italic fw-bold">Login Now!</Link></p>

                                <button type="submit" className="btn btn-lg custom-btn-prim" onClick={handleSubmit} disabled={loader === "Registering..."}>
                                    <h6 className='my-auto mx-auto text-white'>{loader}</h6>
                                    {loader === "Registering..." && <Spinner animation="border" size='sm' />}
                                </button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
}

export default Register;
