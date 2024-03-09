import React from 'react';
import { Link } from 'react-router-dom';
import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

const AdminListenerProfile = ({listener}) => {
    const breadcrumbs = [
        { label: 'Manage Listeners', link: '/admin/listeners' },
        { label: 'Listener Profile', link: '/admin/listeners/profile' },
    ]
    return (
        <div className='admin-normal-container'>
            <div className='admin-content-header'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div>
                
            </div>
            <div>
                <div className="d-flex justify-content-center">
                    <div className="container mt-5 mb-5 p-4 w-75 rounded" style={{backgroundColor: '#444141b0'}}>
                        <div className="d-flex justify-content-between" style={{backgroundColor: '#1B1B1B'}}>

                            <div className="container w-50 p-5 me-4 rounded">
                                <h3 className="text-white fw-bold pb-3">User Information</h3>
                                <div className="row w-75">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label for="name" className="form-label text-white">Name</label>
                                            <input type="text" className="form-control" id="name" value="Name" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="username" className="form-label text-white">Username</label>
                                            <input type="text" className="form-control" id="username" value="Username" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="account_type" className="form-label text-white">Account Type</label>
                                            <input type="text" className="form-control" id="account_type" value="Artist" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="email" className="form-label text-white">Email</label>
                                            <input type="text" className="form-control" id="email" value="Email" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="registered_on" className="form-label text-white">Registered On</label>
                                            <input type="text" className="form-control" id="registered_on" value="02/29/2024" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="password" className="form-label text-white">Password</label>
                                            <input type="text" className="form-control" id="password" value="Password" disabled/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="status" className="form-label text-white">Status</label>
                                            <input type="text" className="form-control" id="status" value="Active" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" d-flex container w-50">
                                <div className="col" >
                                    <div className="container h-50 rounded p-5 mb-5" style={{backgroundColor: '#1B1B1B'}}>
                                        <h3 className="text-white fw-bold">Attached Documents</h3>
                                        <input type="text" className="form-control mb-2" name="file" id="file" value="The file" disabled/>
                                    </div>
                                    <div className="container h-25 rounded p-5 justify-content-between align-items-center" style={{backgroundColor: '#1B1B1B'}}>
                                        <h3 className="text-white fw-bold mb-4">Actions</h3>
                                        <div className="d-flex">
                                            <button className="btn btn-primary w-50 me-3">Edit</button>
                                            <button className="btn btn-danger w-50">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminListenerProfile;