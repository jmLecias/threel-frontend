import React, { useState, useEffect } from 'react';

import AdminManageListeners from './AdminManageListeners';
import AdminListenerProfile from './AdminListenerProfile';

const AdminListeners = ({display}) => {

    return (
        <>
            {display === 'listenersList' && <AdminManageListeners />}
            {display === 'listenerProfile' && <AdminListenerProfile />}
        </>
    )
}

export default AdminListeners;