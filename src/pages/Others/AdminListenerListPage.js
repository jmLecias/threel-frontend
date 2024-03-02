import React, { useState } from 'react';
import AdminNav from '../../components/AdminSideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBan, faRotate } from '@fortawesome/free-solid-svg-icons';
import StorageService from '../../services/StorageService';

function AdminListenerList() {
    const ss = new StorageService();

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [artists, setArtists] = useState([
        { id: 1, name: 'Listener 1', joinedOn: '2022-02-20' },
        { id: 2, name: 'Listener 2', joinedOn: '2022-02-21' },
        { id: 3, name: 'Listener 3', joinedOn: '2022-02-22' },
    ]);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = (artistId) => {
        // Filter out the artist with the given ID
        const updatedArtists = artists.filter(artist => artist.id !== artistId);
        setArtists(updatedArtists);
    };

    const handleBan = (artistId) => {
        // Filter out the artist with the given ID
        const updatedArtists = artists.filter(artist => artist.id !== artistId);
        setArtists(updatedArtists);
    };

    const handleRestore = (artistId) => {
        // Filter out the artist with the given ID
        const updatedArtists = artists.filter(artist => artist.id !== artistId);
        setArtists(updatedArtists);
    };

    const renderTable = () => {
        switch (activeTab) {
            case 'All':
                return <AllListenersTable searchQuery={searchQuery} artists={artists} handleDelete={handleDelete} handleBan={handleBan} />;
            case 'Ban List':
                return <BannedListenersTable searchQuery={searchQuery} artists={artists} handleDelete={handleDelete} handleRestore={handleRestore}/>;
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid d-flow">
            <div className="row">
                <div className={`col-md-${isSideNavOpen ? 3 : 12}`} style={{ marginRLeft: isSideNavOpen ? '15px' : '0' }}>
                <AdminNav />
                </div>
                <div  style={{ marginLeft: '400px' , width: '74%'}}>
                    <h1 className="text-white fw-bold">LISTENER</h1>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'All' ? 'active' : ''} border-0`} 
                                 onClick={() => handleTabChange('All')}
                                 style={{backgroundColor: activeTab === 'All' ? '#464646' : '#272727', 
                                 color: activeTab === 'All' ? 'white' : '#D9D9D9',
                                 fontWeight: activeTab === 'All' ? 'bold' : '',}}>
                                    All
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'Ban List' ? 'active' : ''} border-0`} 
                                 onClick={() => handleTabChange('Ban List')}
                                 style={{backgroundColor: activeTab === 'Ban List' ? '#464646' : '#272727', 
                                 color: activeTab === 'Ban List' ? 'white' : '#D9D9D9',
                                 fontWeight: activeTab === 'Ban List' ? 'bold' : '',}}>
                                    Ban List
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

function AllListenersTable({ searchQuery, artists, handleDelete, handleBan }) {
    return (
        <div>
            <table className="table">
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

function BannedListenersTable({ searchQuery, artists, handleDelete, handleRestore }) {
    return (
        <div>
            <table className="table table-bordered">
                <thead style={{borderColor: 'black'}}>
                    <tr className="text-center">
                        <th className="text-danger">Name</th>
                        <th className="text-danger">Banned On</th>
                        <th className="text-danger">Actions</th>
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
                                <button className="bg-transparent border-0" onClick={() => handleRestore(artist.id)}>
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

export default AdminListenerList;