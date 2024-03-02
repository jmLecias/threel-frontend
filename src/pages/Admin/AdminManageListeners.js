import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ContentTabs from '../../components/ContentTabs';
import ThreelBreadcrumbs from '../../components/ThreelBreadcrumbs';
import { useNavigate } from 'react-router-dom';
import threel_api from '../../backend/api';

import { BiArrowToLeft, BiArrowToRight, BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

const AdminManageListeners = () => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);

    const tabs = ['All', 'Verification Requests', 'Banned'];
    const breadcrumbs = [
        { label: 'Manage Listeners', link: '/admin/listeners' },
    ]

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await threel_api.post('/display');
            setData(response.data.artists);
            setResult(response.data.artists);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.user_type,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.is_banned,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => {
                return (
                    <div>
                        <RiDeleteBin2Fill
                            onClick={() => handleAction(row)}
                            color='red'
                            size={25}
                            title="Delete" />
                        <TiCancel
                            onClick={() => handleAction(row)}
                            color='grey'
                            size={30}
                            title="Ban" />
                        <FaClipboardCheck
                            onClick={() => handleAction(row)}
                            color='green'
                            size={25}
                            title="Verify" />
                        <FaArrowRotateLeft
                            onClick={() => handleAction(row)}
                            color='grey'
                            size={22}
                            title="Unban" />
                        <FaUserEdit
                            onClick={() => navigate('/admin/listeners/profile')}
                            color='blue'
                            size={27}
                            title="Edit" />
                    </div>
                )
            }
        },
    ];

    const handleAction = (row) => {
        console.log('Action 1 for row:', row);
        // Implement your logic for action 1 using the data from the row
    };

    const handleTabChange = (tab) => {
        var filteredData;

        switch (tab) {
            case tabs[0]:
                setResult(data);
                break;
            case tabs[1]:
                filteredData = data.filter(row => row.user_type === 'listener');
                setResult(filteredData);
                break;
            case tabs[2]:
                filteredData = data.filter(row => row.is_banned);
                setResult(filteredData);
                break;
            default:
                break;
        }
    };

    const handleFilterChange = (event) => {
        const searchFilter = event.target.value.toLowerCase();

        const newResult = data.filter(row => {
            return columns.some(column => {
                const columnSelector = String(column.selector);
                const indexOfDot = columnSelector.indexOf('.') + 1;
                const columnName = columnSelector.substring(indexOfDot, columnSelector.length);

                const columnValue = String(row[columnName]).toLowerCase();
                return columnValue.includes(searchFilter);
            });
        });

        setResult(newResult);
    };


    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'var(--primary-color)',
            },
        },
        headCells: {
            style: {
                color: '#ffdede',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        pagination: {
            style: {
                backgroundColor: 'transparent',
                color: '#fff',
            }
        }
    };

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    return (
        <div className='admin-normal-container'>
            <div className='admin-content-header'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className='d-flex justify-content-between'>
                <ContentTabs
                    tabs={tabs}
                    onTabChange={handleTabChange}
                />
                <input
                    className='form-control w-25'
                    type="text"
                    placeholder="Search"
                    onChange={handleFilterChange}

                />
            </div>
            <div className='data-table box-shadow'>
                <DataTable
                    columns={columns}
                    data={result}
                    customStyles={customStyles}
                    paginationComponentOptions={paginationComponentOptions}
                    persistTableHead
                    striped
                    selectableRows
                    pagination
                    highlightOnHover
                    pointerOnHover
                    paginationIconFirstPage={<BiArrowToLeft color='white' size={25} />}
                    paginationIconPrevious={<BiSolidChevronLeft color='white' size={20} />}
                    paginationIconNext={<BiSolidChevronRight color='white' size={20} />}
                    paginationIconLastPage={<BiArrowToRight color='white' size={25} />}
                    onRowDoubleClicked={(row) => navigate('/admin/listeners/profile')}
                />
            </div>
        </div>
    )
}

export default AdminManageListeners;