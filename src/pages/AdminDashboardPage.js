import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminSideNav';

function AdminDashboard() {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    return (
        <div className="container-fluid d-flow">
            <div className="row">
                <div className={`col-md-${isSideNavOpen ? 3 : 12}`}>
                    <AdminNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
                </div>
                <div className={`col-md-${isSideNavOpen ? 9 : 12}`}>
                    <button className="btn float-end" onClick={toggleSideNav} role="button">
                        <p className={`bi bi-${isSideNavOpen ? 'arrow-right-square-fill' : 'arrow-left-square-fill'} fs-3 text-white`}>+</p>
                    </button>
                    <h1 className="text-white fw-bold">APP STATISTICS</h1>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
