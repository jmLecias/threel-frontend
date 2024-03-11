import React from 'react';

import { useUser } from '../../hooks/useUser';

const ContentTabs = () => {

    const { setActiveTab, setResult, users, tabs, activeTab} = useUser();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setResult(tab.filter(users));
    }

    return (
        <div className='d-flex flex-row'>
            {tabs.map((tab, index) => (
                <h6
                    key={index}
                    className={`me-4 fw-light ${activeTab.title === tab.title ? 'border-bottom border-3 border-danger' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.title}
                </h6>
            ))}
        </div>
    );
};

export default ContentTabs;
