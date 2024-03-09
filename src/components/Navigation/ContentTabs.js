import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ContentTabs = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className='d-flex flex-row'>
            {tabs.map((tab, index) => (
                <h6
                    key={index}
                    className={`me-4 fw-light ${activeTab === tab ? 'border-bottom border-3 border-danger' : ''}`}
                    style={{cursor: 'pointer'}}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </h6>
            ))}
        </div>
    );
};

export default ContentTabs;
