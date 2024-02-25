import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import AuthenticationService from '../services/AuthenticationService';

function Player() {
    const navigate = useNavigate();
    const auth = new AuthenticationService();
    const { logout, user } = useAuth();

    const [logoutText, setLogoutText] = useState("Logout");

    const handleLogout = (event) => {
        event.preventDefault();
        setLogoutText("Logging out...");
        logout().then((isLoggedOut) => {
            if (isLoggedOut) {
                setLogoutText("Logout");
                navigate("/login")
            }
        }).catch(() => {
            setLogoutText("Logout");
            toast.error("Error while logging out", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });
    }
    const handleMe = (event) => {
        event.preventDefault();
        const name = JSON.parse(auth.getUser()).original.name;
        toast.info("Hello! You are " + name, {
            position: "bottom-right",
            autoClose: 1000,
            pauseOnHover: true,
        });
    }
    return (
        <div className="App" >
            <ToastContainer />
            <header>
                <div className="header-logo">
                    <div>
                        <img className="menu" src="images/icon-menu.png" alt="menu" />
                    </div>
                    <h1>THREEL</h1>
                </div>

                <div className="header-actions mx-auto my-auto">
                    <h1 className="username-actions">{JSON.parse(auth.getUser()).original.name}</h1>
                    <div className="user-dropdown">
                        {/* <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul> */}
                    </div>
                    <button className="registerButton" onClick={handleLogout} disabled={(logoutText) === "Logging out..."}>
                        {logoutText}
                    </button>
                    <br/>
                    <button className="registerButton" onClick={handleMe}>
                        Who am I?
                    </button>
                </div>
            </header>

            {/* <nav>
                <div className="btn-explore">
                    <div style={{ marginRight: '15px', marginTop: '5px' }}>
                        <img src="images/icon-trending.png" alt="icon-explore" />
                    </div>
                    <a style={{ padding: '0px', fontSize: '20px', fontWeight: 'bold' }} href="#">EXPLORE</a>
                </div>
                <br />
                <ul>
                    <li><a href="#">My Playlist</a></li>
                    <li><a href="#">Podcasts</a></li>
                    <li><a href="#">Videocasts</a></li>
                    <li><a href="#">Songs</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
            </nav> */}

            {/* <main>
                <div className="media-player">
                    <video width="100%" height="100%" style={{ borderRadius: '10px' }} controls autoPlay>
                        <source src="videos/AquaintanceIntroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="controls-container">
                    <div className="media-progress">
                        <h1 className="time-progress time-text">
                            00:00
                        </h1>
                        <div className="progress-bar">
                            <div className="progress-buffer"></div>
                            <div className="progress-current"></div>
                        </div>
                        <h1 className="time-length time-text">
                            00:00
                        </h1>
                    </div>
                    <div className="controls">
                        <div className="left-controls">
                            <img className="control-button" src="images/icon-fullscreen.png" alt="fullscreen" />
                        </div>
                        <div className="main-controls">
                            <img className="control-button" style={{ transform: 'rotate(180deg)' }} src="images/icon-next.png" alt="next" />
                            <img className="control-button btn-play" src="images/icon-play.png" alt="play" />
                            <img className="control-button" src="images/icon-next.png" alt="next" />
                        </div>
                        <div className="right-controls">
                            <img className="control-button" src="images/icon-heart.png" alt="heart" />
                            <img className="control-button" src="images/icon-donate.png" alt="donate" />
                        </div>
                    </div>
                </div>
            </main>

            <aside>
                <div>
                    <h1 style={{ fontSize: '30px' }}>TITLE</h1>
                    <h3 style={{ fontSize: '18px', fontWeight: 'normal' }}>Owner</h3>
                </div>
                <div className="desc-container">
                    <h2 style={{ fontSize: '20px' }}>DESCRIPTION</h2>
                    <p style={{ fontWeight: 'normal', fontSize: '15px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </aside> */}
        </div>
    );
}

export default Player;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import ThreelModal from '../components/ThreelModal';
import threel_api from '../backend/api';
import StorageService from '../services/StorageService';
import Button from 'react-bootstrap/Button';


function Player() {
    const ss = new StorageService();
    const urlParams = new URLSearchParams(window.location.search);


    const navigate = useNavigate();
    const [isCooldown, setIsCooldown] = useState(false);
    const { logout, me, user } = useAuth();

    const [isEmailVerified, setIsEmailVerified] = useState(
        JSON.parse(ss.getItem('user')).email_verified_at !== null);


    const [modal, setModal] = useState({
        show: false,
        title: '',
        description: '',
        close: '',
        action: '',
        onClose: () => { },
        onAction: () => { },
    });

    const [logoutText, setLogoutText] = useState("Logout");

    useEffect(() => {
        const status = urlParams.get('status');

        me().then(() => {
            setIsEmailVerified(JSON.parse(ss.getItem('user')).email_verified_at !== null);
        }).catch((error) => {
            console.log(error);
        });


        if (status === 'verification_success') {
            setModal({
                show: true,
                title: 'Verification Successful',
                description: 'Congratulations, you have successfully verified your email address. You can now access more feautures on Threel!',
                close: 'Close',
                action: '',
                onClose: () => {
                    setModal({ show: false });
                    navigate('/home');
                },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'verification_sent') {
            setModal({
                show: true,
                title: 'Verify Email Address',
                description: 'An email address verification link was sent to you. Please check your email and verify email address to continue using Threel!',
                close: 'Close',
                action: '',
                onClose: () => {
                    setModal({ show: false });
                    navigate('/home');
                },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'already_verified') {
            toast.error("Email already verified", {
                autoClose: 3000,
                onClose: () => { navigate('/home') },
                pauseOnHover: true,
            });
        }
        if (status === 'verification_error') {
            toast.error("Error while verifying email", {
                autoClose: 3000,
                onClose: () => { navigate('/home') },
                pauseOnHover: true,
            });
        }
    }, []);


    const handleLogout = (event) => {
        event.preventDefault();
        setLogoutText("Logging out...");
        logout().then((isLoggedOut) => {
            if (isLoggedOut) {
                setLogoutText("Logout");
                navigate("/login")
            }
        }).catch(() => {
            setLogoutText("Logout");
            toast.error("Error while logging out", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });
    }

    const handleCooldown = () => {
        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        },  30000); 
    };

    const handleVerify = (event) => {
        event.preventDefault();
        if (isCooldown) return; 
        handleCooldown(); 
        const credentials = {
            id: JSON.parse(ss.getItem('user')).id,
        }
        threel_api.post('/email/send-verification', credentials).then((response) => {
            if (response.status === 200) {
                toast.info(response.data.status, {
                    autoClose: 3000,
                    pauseOnHover: true,
                });
            }
        }).catch((error) => {
            toast.error("Error while logging out", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });

    }

    return (
        <div className="App" >
            <ToastContainer />
            <ThreelModal
                action={modal.action}
                title={modal.title}
                description={modal.description}
                show={modal.show}
                close={modal.close}
                onClose={modal.onClose}
                onAction={modal.onAction}
            />
            <header>
                <div className="header-logo">
                    <div>
                        {/* <img className="menu" src="images/icon-menu.png" alt="menu" /> */}
                    </div>
                    <h1>THREEL</h1>
                </div>

                <div className="header-actions mx-auto my-auto">
                    <h2 className="text-white">
                        {JSON.parse(ss.getItem('user')).name}
                    </h2>
                    <Button variant="danger" onClick={handleLogout} disabled={(logoutText) === "Logging out..."}>
                        {logoutText}
                    </Button>
                    <br />
                    <br />
                    {!isEmailVerified && (
                        <>
                            <h5 className='text-white'>Did not receive email verification? Click the resend button below.</h5>
                            <Button variant="primary" onClick={handleVerify} disabled={isCooldown}>
                                Resend 
                            </Button>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Player;
