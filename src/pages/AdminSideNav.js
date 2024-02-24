import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function AdminNav() {
    return (
        <div className="offcanvas offcanvas-start w-25 bg-dark" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminNav;
