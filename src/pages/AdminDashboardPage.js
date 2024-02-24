import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import AdminNav from './AdminSideNav';

function AdminDashboard() {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false); // State to track side nav visibility

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen); // Toggle side nav visibility
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {isSideNavOpen && (
                    <div className="col-md-3">
                        <AdminNav />
                    </div>
                )}
                <div className={`col-md-${isSideNavOpen ? 9 : 12}`}>
                    <button className="btn float-end" onClick={toggleSideNav} role="button">
                        <p className="bi bi-arrow-right-square-fill fs-3 text-white">+</p>
                    </button>
                    <p className="text-white">TEXT</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
