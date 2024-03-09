import React from 'react';

import InfoCard from '../../components/Information/InfoCard';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

const AdminDashboard = () => {
    const breadcrumbs=[
        {label: 'Dashboard', link: '/admin/dashboard'}
    ]

    return (
        <div className='admin-dashboard-container'>
            <div className='admin-content-header'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs}/>
            </div>
            <InfoCard title={"Revenue"} content={"$ 1,000,000"} />
            <InfoCard title={"Plays"} content={"400,000"} />
            <InfoCard title={"Listeners"} content={"11,500,000"} />
            <PieChart title={"Listeners"} />
            <LineChart title={"Users"} />
        </div>

    )
}

export default AdminDashboard;