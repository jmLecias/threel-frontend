import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminNav({ isSideNavOpen, toggleSideNav }) {
    return (
        <div className={`offcanvas offcanvas-start bg-dark ${isSideNavOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvas">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-white display-6">Hello, <span className="display-6 fw-bold">Admin</span></h5>
                <button type="button" className="btn-close text-reset" onClick={toggleSideNav} aria-label="Close"></button>
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
        </div>
    );
}

export default AdminNav;
