import React from 'react';
import { Link } from 'react-router-dom';

import UploadDropdown from './UploadDropdown';

import { TiUpload } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";

const ListenerHeader = ({ isLoggedIn }) => {

    return (
        <header>
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
                    <UploadDropdown icon={
                        <TiUpload
                            size={24} 
                            title='Upload'
                        />
                    } />
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
