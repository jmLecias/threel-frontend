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
        if(isCooldown) return;
        handleCooldown();
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
