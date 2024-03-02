import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="binoculars">
                <div className="lens"></div>
                <div className="lens right"></div>
                <div className="question-mark">?</div>
            </div>
            <h1>Page not found!</h1>
            <NavLink to="/admin/dashboard" className="home-button">Back</NavLink>
        </div>
    );
}

export default NotFoundPage;