import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../hooks/useAuth";
import StorageService from '../services/StorageService';

function AdminNav() {
    const ss = new StorageService();
    const { logout, me, user } = useAuth();
    const navigate = useNavigate();
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

    return (
        <div className={`offcanvas offcanvas-start bg-dark show`} id="offcanvas">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-white display-6">Hello, <span className="display-6 fw-bold">{JSON.parse(ss.getItem('user')).username}</span></h5>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav flex-column" id="menu">
                    <li className="nav-item">
                        <NavLink to="/adminboard" className="nav-link text-truncate" activeClassName="active">
                            Dashboard
                        </NavLink>
                        <NavLink to="/artistlist" className="nav-link text-truncate" activeClassName="active">
                            Artist List
                        </NavLink>
                        <NavLink to="/listenerlist" className="nav-link text-truncate" activeClassName="active">
                            Listener List
                        </NavLink>
                        <NavLink to="/musiclist" className="nav-link text-truncate" activeClassName="active">
                            Music List
                        </NavLink>
                        <NavLink to="/podcastlist" className="nav-link text-truncate" activeClassName="active">
                            Podcast List
                        </NavLink>
                        <NavLink to="/videocastlist" className="nav-link text-truncate" activeClassName="active">
                            Videocast List
                        </NavLink>
                        <NavLink to="/prices" className="nav-link text-truncate" activeClassName="active">
                            Pricing Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="offcanvas-header">
                <Button className="m-2 float-end" variant="danger" onClick={handleLogout} disabled={(logoutText) === "Logging out..."}>
                    {logoutText}
                </Button>
            </div>
        </div>

    );
}

export default AdminNav;
