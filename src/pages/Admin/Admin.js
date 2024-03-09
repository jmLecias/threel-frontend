import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ThreelModal from '../../components/Information/ThreelModal';
import StorageService from '../../services/StorageService';
import { useAuth } from "../../hooks/useAuth";

import AdminSidebar from '../../components/Navigation/AdminSidebar';

import AdminListeners from './AdminListeners';
import AdminDashboard from './AdminDashboard';

import NotFoundPage from '../Others/PageNotFound';

const Admin = ({ content }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const { me } = useAuth();
    const ss = new StorageService();

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

    useEffect(() => {
        const status = urlParams.get('status');

        me().then(() => {
            if(ss.getItem('user') !== null) {
                setIsEmailVerified(JSON.parse(ss.getItem('user')).email_verified_at !== null);
            }
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
                    navigate('/admin/dashboard');
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
                    navigate('/admin/dashboard');
                },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'already_verified') {
            toast.error("Email already verified", {
                autoClose: 3000,
                onClose: () => { navigate('/adminboard') },
                pauseOnHover: true,
            });
        }
        if (status === 'verification_error') {
            toast.error("Error while verifying email", {
                autoClose: 3000,
                onClose: () => {  navigate('/admin/dashboard'); },
                pauseOnHover: true,
            });
        }
    }, [me, navigate, ss, urlParams]);

    return (
        <div className='admin-container'>
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

            <AdminSidebar />

            {/* Content Area */}
            <div className='admin-content'>
                {/* Dashboard Content */}
                {content === 'dashboard' && <AdminDashboard />}
                {/* Listener Content */}
                {content === 'listenersList' && <AdminListeners display={content} />}
                {content === 'listenerProfile' && <AdminListeners display={content} />}
                {/* Music Content */}
                {content === 'music' && <NotFoundPage />}
                {/* Podcasts Content */}
                {content === 'podcasts' && <NotFoundPage />}
                {/* Videocasts Content */}
                {content === 'videocasts' && <NotFoundPage />}
                {/* Pricing Content */}
                {content === 'pricing' && <NotFoundPage />}
                {/* Page not Found */}
                {content === 'not_found' && <NotFoundPage />}
            </div>
        </div>
    );
}

export default Admin;
