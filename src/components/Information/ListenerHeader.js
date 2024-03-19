import React from 'react';
import { Link } from 'react-router-dom';

import UploadDropdown from '../Uploads/UploadDropdown';

import { TiUpload } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";

import { useAuth } from '../../hooks/useAuth';

const ListenerHeader = ({ isLoggedIn }) => {

    const {user} = useAuth();

    return (
        <header className=''>
            <span className='logo-text'>THREEL</span>

            {!isLoggedIn && (
                <div className='d-flex align-items-center'>
                    <Link to={'/login'} style={{ textDecoration: 'none' }}>
                        <span className='header-text'>Login</span>
                    </Link>
                    <Link to={'/register'} style={{ textDecoration: 'none' }}>
                        <span className='header-text'>Register</span>
                    </Link>
                </div>
            ) || (
                <div className='d-flex align-items-center'>
                    {user.user_type >= 2 && (
                        <UploadDropdown icon={
                            <TiUpload
                                size={24} 
                                title='Upload'
                            />
                        } />
                    )}
                    <div className='header-icons'>
                        <IoNotifications 
                            size={24} 
                            title='Notifications'
                            onClick={() => {

                            }}/>
                    </div>
                </div>
            )}
        </header>
    );
}

export default ListenerHeader;
