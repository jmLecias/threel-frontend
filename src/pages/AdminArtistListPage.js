import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminSideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan, faRotate, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import threel_api from '../backend/api';

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
}

function AdminArtistList() {
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
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await threel_api.post('/display');
                setArtists(response.data.artists);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchArtists();
    }, []);

    return (
        <div>
            <table className="table table-bordered">
                <thead style={{ borderColor: 'black' }}>
                    <tr className="text-center">
                        <th className="text-danger">Name</th>
                        <th className="text-danger">Joined On</th>
                        <th className="text-danger">Controls</th>
                    </tr>
                </thead>
                <tbody className='text-center fw-bold' style={{ borderColor: 'black' }}>
                    {artists.map(artist => (
                        <tr key={artist.id}>
                            <td>{artist.name}</td>
                            <td>{formatTimestamp(artist.created_at)}</td>
                            <td>
                                <button className="bg-transparent border-0 me-4" onClick={() => handleDelete(artist.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </button>
                                <button className="bg-transparent border-0" onClick={() => handleBan(artist.id)}>
                                    <FontAwesomeIcon icon={faBan} style={{ color: 'black' }} />
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
    const response = threel_api.post(`/ban-artist/${artistId}`);
    response.then(() => {
        window.location.reload();
    })
}

function handleRestore(artistId) {
    const response = threel_api.post(`/restore-artist/${artistId}`);
    response.then(() => {
        window.location.reload();
    })
}

function handleVerify(artistId) {
    const response = threel_api.post(`/verify-artist/${artistId}`);
    response.then(() => {
        window.location.reload();
    })
}

function BannedArtistsTable({ searchQuery }) {
    const [bannedArtists, setBannedArtists] = useState([]);

    useEffect(() => {
        const fetchBannedArtists = async () => {
            try {
                const response = await threel_api.post('/display-banned-artist');
                setBannedArtists(response.data.banned_artists);
                console.log('Banned artists response:', response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchBannedArtists();
    }, []);
    
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
                        {bannedArtists.map(banned_artist => (
                            <tr key={banned_artist.id}>
                                <td>{banned_artist.name}</td>
                                <td>{formatTimestamp(banned_artist.updated_at)}</td>
                                <td>
                                    <button className="bg-transparent border-0 me-4" onClick={() => handleDelete(banned_artist.id)}>
                                        <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} />
                                    </button>
                                    <button className="bg-transparent border-0" onClick={() => handleRestore(banned_artist.id)}>
                                        <FontAwesomeIcon icon={faRotate} style={{color: 'black'}} />
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
    const [nverifiedArtists, setNverifiedArtists] = useState([]);

    useEffect(() => {
        const fetchNotVerifiedArtists = async () => {
            try {
                const response = await threel_api.post('/display-not-verified-artist');
                setNverifiedArtists(response.data.nverified_artists);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchNotVerifiedArtists();
    }, []);
    
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
                        {nverifiedArtists.map(nverified_artist => (
                            <tr key={nverified_artist.id}>
                                <td>{nverified_artist.name}</td>
                                <td>{nverified_artist.joinedOn}</td>
                                <td>
                                    <button className="bg-transparent border-0 me-4" onClick={() => handleVerify(nverified_artist.id)}>
                                        <FontAwesomeIcon icon={faCircleCheck} style={{color: 'lightgreen'}} />
                                    </button>
                                    <button className="bg-transparent border-0" onClick={() => handleBan(nverified_artist.id)}>
                                        <FontAwesomeIcon icon={faTrash} style={{color: 'black'}} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default AdminArtistList;
