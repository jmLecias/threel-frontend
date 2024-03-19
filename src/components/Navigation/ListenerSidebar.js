import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

import { MdOutlineExplore } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";
import { SiApplepodcasts } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const ListenerSidebar = () => {
    const { user, logout, home } = useAuth();
    const [logoutText, setLogoutText] = useState("Logout");
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        setLogoutText("Logging out...");
        logout().then((isLoggedOut) => {
            if (isLoggedOut) {
                setLogoutText("Logout");
                navigate(home)
                toast.info("Successfully logged out.", {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
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
        <ProSidebar hidden={false}>
            <SidebarContent>
                <SidebarHeader>
                    <Menu>
                        <MenuItem icon={<MdOutlineExplore size={25} />}>
                            <Link to="/"><span className='explore-text'>EXPLORE</span></Link>
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <Menu >
                    {user && (
                        <MenuItem icon={<MdLibraryMusic size={20} />}><Link to="/">My Playlists</Link></MenuItem>
                    )}
                    <MenuItem icon={<SiApplepodcasts size={20} />}><Link to="/">Podcasts</Link></MenuItem>
                    <MenuItem icon={<FaVideo size={20} />}><Link to="/">Videocasts</Link></MenuItem>
                    <MenuItem icon={<IoMusicalNotes size={20} />}><Link to="/">Songs</Link></MenuItem>
                </Menu>
            </SidebarContent>
            {user && (
                <SidebarFooter>
                    <Menu>
                        <SubMenu icon={<FaUserCircle size={25} />} title={user.username}>
                            {user.user_type >= 3 && (
                                <MenuItem
                                    icon={<MdOutlineAdminPanelSettings size={20} />}
                                >
                                    <Link to="/admin/dashboard">Admin Interface</Link>
                                </MenuItem>
                            )}
                            <MenuItem
                                icon={<IoSettingsSharp size={20} />}
                                onClick={() => toast.info("Account Settings")}
                            >Account Settings</MenuItem>

                            <MenuItem
                                icon={<FiLogOut size={20} />}
                                onClick={handleLogout}
                            >{logoutText}</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarFooter>
            )}
        </ProSidebar>
    );
}

export default ListenerSidebar;
