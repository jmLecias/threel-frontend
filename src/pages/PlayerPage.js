import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import ThreelModal from '../components/ThreelModal';
import threel_api from '../backend/api';
import StorageService from '../services/StorageService';


function Player() {
    const ss = new StorageService();
    const urlParams = new URLSearchParams(window.location.search);

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const [isEmailVerified, setIsEmailVerified] = useState(false);
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

        setIsEmailVerified(JSON.parse(ss.getItem('user')).original.email_verified_at !== '');

        if (status === 'verification_success') {
            setModal({
                show: true,
                title: 'Verification Successful',
                description: 'Conratulations, you have successfully verified your email address. You can now access more feautures on Threel!',
                close: 'Close',
                action: '',
                onClose: () => { setModal({ show: false }) },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'already_verified') {
            toast.error("Email already verified", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        }
        if (status === 'verification_error') {
            toast.error("Error while verifying email", {
                autoClose: 3000,
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
    const handleVerify = (event) => {
        event.preventDefault();
        const credentials = {
            id: JSON.parse(ss.getItem('user')).original.id,
        }
        threel_api.post('/email/send-verification', credentials).then((response) => {
            if(response.status === 200) {
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
                        <img className="menu" src="images/icon-menu.png" alt="menu" />
                    </div>
                    <h1>THREEL</h1>
                </div>

                <div className="header-actions mx-auto my-auto">
                    <h1 className="username-actions">
                        {JSON.parse(ss.getItem('user')).original.name}
                    </h1>
                    <div className="user-dropdown">
                        {/* <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul> */}
                    </div>
                    <button className="registerButton" onClick={handleLogout} disabled={(logoutText) === "Logging out..."}>
                        {logoutText}
                    </button>
                    <br />
                    {isEmailVerified && (
                        <>
                            <h5>Did not receive email verification? Click the resend button below.</h5>
                            <button className="registerButton" onClick={handleVerify}>
                                Resend
                            </button>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Player;
