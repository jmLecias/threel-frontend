import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminSideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';

function AdminListenerList() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const renderTable = () => {
        switch (activeTab) {
            case 'All':
                return <AllArtistsTable searchQuery={searchQuery} />;
            case 'Ban List':
                return <BannedArtistsTable searchQuery={searchQuery} />;
            case 'Verify Artist':
                return <VerifyArtistsTable searchQuery={searchQuery} />;
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid d-flow">
            <div className="row">
                <div className={`col-md-${isSideNavOpen ? 3 : 12}`} style={{ marginRLeft: isSideNavOpen ? '15px' : '0' }}>
                    <AdminNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
                </div>
                <div className={`col-md-${isSideNavOpen ? 9 : 12}`}>
                    <button className="btn float-end" onClick={toggleSideNav} role="button">
                        <p className={`bi bi-${isSideNavOpen ? 'arrow-right-square-fill' : 'arrow-left-square-fill'} fs-3 text-white`}>+</p>
                    </button>
                    <h1 className="text-white fw-bold">ARTIST</h1>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'All' ? 'active' : ''}`} onClick={() => handleTabChange('All')}>
                                    All
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'Ban List' ? 'active' : ''}`} onClick={() => handleTabChange('Ban List')}>
                                    Ban List
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'Verify Artist' ? 'active' : ''}`} onClick={() => handleTabChange('Verify Artist')}>
                                    Verify Artist
                                </button>
                            </li>
                        </ul>
                        <input 
                            type="text" 
                            className="form-control w-25" 
                            placeholder="Search" 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                        />
                    </div>

                    {renderTable()}
                </div>
            </div>
        </div>
    );
}

function AllArtistsTable({ searchQuery }) {
    // Mock data for demonstration
    const artists = [
        { id: 1, name: 'Artist 1', joinedOn: '2022-02-20' },
        { id: 2, name: 'Artist 2', joinedOn: '2022-02-21' },
        { id: 3, name: 'Artist 3', joinedOn: '2022-02-22' },
    ];

    return (
        <div>
            <table className="table table-bordered">
                <thead style={{borderColor: 'black'}}>
                    <tr className="text-center">
                        <th className="text-danger">Name</th>
                        <th className="text-danger">Joined On</th>
                        <th className="text-danger">Controls</th>
                    </tr>
                </thead>
                <tbody className='text-center fw-bold' style={{borderColor: 'black'}}>
                    {artists.map(artist => (
                        <tr key={artist.id}>
                            <td>{artist.name}</td>
                            <td>{artist.joinedOn}</td>
                            <td>
                                <button className="bg-transparent border-0 me-4" onClick={() => handleDelete(artist.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                                </button>
                                <button className="bg-transparent border-0" onClick={() => handleBan(artist.id)}>
                                    <FontAwesomeIcon icon={faBan} style={{color: 'black'}} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function handleDelete(artistId) {
    // Handle delete functionality
    console.log(`Deleting artist with ID ${artistId}`);
}

function handleBan(artistId) {
    // Handle ban functionality
    console.log(`Banning artist with ID ${artistId}`);
}

function BannedArtistsTable({ searchQuery }) {
    // Implement table for banned artists with search functionality
        // Mock data for demonstration
        const artists = [
            { id: 1, name: 'Artist 1', joinedOn: '2022-02-20' },
            { id: 2, name: 'Artist 2', joinedOn: '2022-02-21' },
            { id: 3, name: 'Artist 3', joinedOn: '2022-02-22' },
        ];
    
        return (
            <div>
                <table className="table table-bordered">
                    <thead style={{borderColor: 'black'}}>
                        <tr className="text-center">
                            <th className="text-danger">Name</th>
                            <th className="text-danger">Banned On</th>
                            <th className="text-danger">Controls</th>
                        </tr>
                    </thead>
                    <tbody className='text-center fw-bold' style={{borderColor: 'black'}}>
                        {artists.map(artist => (
                            <tr key={artist.id}>
                                <td>{artist.name}</td>
                                <td>{artist.joinedOn}</td>
                                <td>
                                    <button className="bg-transparent border-0 me-4" onClick={() => handleDelete(artist.id)}>
                                        <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                                    </button>
                                    <button className="bg-transparent border-0" onClick={() => handleBan(artist.id)}>
                                        <FontAwesomeIcon icon={faBan} style={{color: 'black'}} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

function VerifyArtistsTable({ searchQuery }) {
    // Implement table for artists that need verification with search functionality
        // Mock data for demonstration
        const artists = [
            { id: 1, name: 'Artist 1', joinedOn: '2022-02-20' },
            { id: 2, name: 'Artist 2', joinedOn: '2022-02-21' },
            { id: 3, name: 'Artist 3', joinedOn: '2022-02-22' },
        ];
    
        return (
            <div>
                <table className="table table-bordered">
                    <thead style={{borderColor: 'black'}}>
                        <tr className="text-center">
                            <th className="text-danger">Name</th>
                            <th className="text-danger">Attached Document</th>
                            <th className="text-danger">Controls</th>
                        </tr>
                    </thead>
                    <tbody className='text-center fw-bold' style={{borderColor: 'black'}}>
                        {artists.map(artist => (
                            <tr key={artist.id}>
                                <td>{artist.name}</td>
                                <td>{artist.joinedOn}</td>
                                <td>
                                    <button className="bg-transparent border-0 me-4" onClick={() => handleDelete(artist.id)}>
                                        <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                                    </button>
                                    <button className="bg-transparent border-0" onClick={() => handleBan(artist.id)}>
                                        <FontAwesomeIcon icon={faBan} style={{color: 'black'}} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default AdminListenerList;
