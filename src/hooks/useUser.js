import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import threel_api from "../backend/api";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const isExplorePage = location.pathname === '/'; 

    const routePrefix = '/admin/manage-users';

    const [users, setUsers] = useState([]);

    const Deactivate = (id, i) => {
        return (
            <TiCancel
                key={i}
                onClick={() => deactivateUser(id)}
                color='grey'
                size={30}
                title="Deactivate" />
        )
    }
    const Activate = (id, i) => {
        return (
            <FaArrowRotateLeft
                key={i}
                onClick={() => activateUser(id)}
                color='grey'
                size={22}
                title="Activate" />
        )
    }

    const Edit = (id, i) => {
        return (
            <FaUserEdit
                key={i}
                onClick={() => navigate(`/admin/listeners/profile`)}
                color='blue'
                size={27}
                title="Edit" />
        )
    }

    const Delete = (id, i) => {
        return (
            <RiDeleteBin2Fill
                key={i}
                onClick={() => deleteUser(id)}
                color='red'
                size={25}
                title="Delete" />
        )
    }

    const Verify = (id, i) => {
        return (
            <FaClipboardCheck
                key={i}
                onClick={() => verifyArtist(id)}
                color='green'
                size={25}
                title="Verify" />
        )
    }

    const tabs = [
        {
            title: 'All',
            filter: (data) => data,
            actions: [Deactivate, Edit, Delete]
        },
        {
            title: 'Verification Requests',
            filter: (data) => data.filter(row => row.status_type.id === 2),
            actions: [Verify, Edit]
        },
        {
            title: 'Deactivated',
            filter: (data) => data.filter(row => row.status_type.id === 3),
            actions: [Activate, Edit, Delete]
        },
    ];

    const [result, setResult] = useState([]);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    useEffect(() => {
        getUsers();
    }, [, activeTab]);

    const getUsers = async () => {
        try {
            const response = await threel_api.post(routePrefix);

            const freshUsers = response.data.users;

            setUsers(freshUsers);
            setResult(activeTab.filter(freshUsers));
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    };

    const verifyArtist = async (id) => {
        try {
            const response = await threel_api.post(routePrefix + `/verify-to-artist/${id}`);

            const updatedUsers = response.data.users;

            setUsers(updatedUsers);
            setResult(activeTab.filter(updatedUsers));
        } catch (error) {
            console.log("Error while verifying user: " + error);
        }
    };

    const deactivateUser = async (id) => {
        try {
            const response = await threel_api.post(routePrefix + `/deactivate/${id}`);

            const updatedUsers = response.data.users;

            console.log(activeTab);

            setUsers(updatedUsers);
            setResult(activeTab.filter(updatedUsers));
        } catch (error) {
            console.log("Error while deactivating user: " + error);
        }
    };

    const activateUser = async (id) => {
        try {
            const response = await threel_api.post(routePrefix + `/activate/${id}`);

            const updatedUsers = response.data.users;

            console.log(activeTab);

            setUsers(updatedUsers);
            setResult(activeTab.filter(updatedUsers));
        } catch (error) {
            console.log("Error while activating user: " + error);
        }
    };

    const deleteUser = async (id) => {
        // set a confirmation modal here
        try {
            const response = await threel_api.post(routePrefix + `/delete/${id}`);

            const updatedUsers = response.data.users;

            setUsers(updatedUsers);
            setResult(activeTab.filter(updatedUsers));
        } catch (error) {
            console.log("Error while deleting user: " + error);
        }
    };

    const updateUser = async (id) => {
        // update logic here
    };

    const value = useMemo(
        () => ({
            users,
            result,
            setResult,
            activeTab,
            setActiveTab,
            getUsers,
            tabs,
        }),
        [users, result, activeTab]
    );
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};