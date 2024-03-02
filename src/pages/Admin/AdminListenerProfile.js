import React from 'react';
import { Link } from 'react-router-dom';
import ThreelBreadcrumbs from '../../components/ThreelBreadcrumbs';

const AdminListenerProfile = () => {
    const breadcrumbs = [
        { label: 'Manage Listeners', link: '/admin/listeners' },
        { label: 'Listener Profile', link: '/admin/listeners/profile' },
    ]
    return (
        <div className='admin-normal-container'>
            <div className='admin-content-header'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </div>
    )
}

export default AdminListenerProfile;