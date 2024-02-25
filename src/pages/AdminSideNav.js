import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';


function AdminNav({ isSideNavOpen, toggleSideNav }) {
    return (
        <div className={`offcanvas offcanvas-start w-5 bg-dark ${isSideNavOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvas">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-white display-6">Hello, <span className="display-6 fw-bold">Admin</span></h5>
                <button type="button" className="btn-close text-reset" onClick={toggleSideNav} aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li className="nav-item">
                        <NavLink to="/adminboard" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Dashboard</span>
                        </NavLink>
                        <NavLink to="/artistlist" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Artist List</span>
                        </NavLink>
                        <NavLink to="/listenerlist"className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Listener List</span>
                        </NavLink>
                        <NavLink to="/musiclist" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Music List</span>
                        </NavLink>
                        <NavLink to="/podcastlist" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Podcast List</span>
                        </NavLink>
                        <NavLink to="/videocastlist" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Videocast List</span>
                        </NavLink>
                        <NavLink to="/prices" className="nav-link text-truncate" activeClassName="active">
                            <span className="ms-1 d-none d-sm-inline text-white">Pricing Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminNav;
