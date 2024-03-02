import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import StorageService from '../services/StorageService';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

import 'react-pro-sidebar/dist/css/styles.css';

import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiFolderMusicFill } from "react-icons/ri";
import { SiApplepodcasts } from "react-icons/si";
import { FaVideo } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const AdminSidebar = () => {
    const ss = new StorageService();
    const username = JSON.parse(ss.getItem('user')).username;
    const { logout } = useAuth();
    const [logoutText, setLogoutText] = useState("Logout");
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        setLogoutText("Logging out...");
        logout().then((isLoggedOut) => {
            if (isLoggedOut) {
                setLogoutText("Logout");
                navigate("/login")
            }
        }).catch(() => {
            setLogoutText("Logout");
            toast.error("Error while logging out", {
                position: 'bottom-center',
                autoClose: 3000,
                pauseOnHover: true,
            });
        });
    }

    return (
        <ProSidebar>
            <SidebarHeader style={{ padding: '20px' }}>
                <h5><span className='logo-text fw-bold'>THREEL</span> | Admin</h5>
            </SidebarHeader>
            <SidebarContent>
                <Menu >
                    <MenuItem icon={<BiSolidDashboard size={20}/>}><Link to="/admin/dashboard">Dashboard</Link></MenuItem>
                    <MenuItem icon={<FaUsers size={20}/>}><Link to="/admin/listeners">Listeners</Link></MenuItem>
                    <MenuItem icon={<RiFolderMusicFill size={20}/>}><Link to="/admin/music">Music</Link></MenuItem>
                    <MenuItem icon={<SiApplepodcasts size={20}/>}><Link to="/admin/podcasts">Podcasts</Link></MenuItem>
                    <MenuItem icon={<FaVideo size={20}/>}><Link to="/admin/videocasts">Videocasts</Link></MenuItem>
                    <MenuItem icon={<FaCreditCard size={20}/>}><Link to="/admin/pricing">Pricing Settings</Link></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu>
                    <SubMenu icon={<FaUserCircle size={25} />} title={username}>
                        <MenuItem 
                            icon={<IoSettingsSharp size={20}/>}
                            onClick={() => toast.info("Account Settings")}
                        >Account Settings</MenuItem>
                        <MenuItem
                            icon={<FiLogOut size={20}/>}
                            onClick={handleLogout}
                        >{logoutText}</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default AdminSidebar;
