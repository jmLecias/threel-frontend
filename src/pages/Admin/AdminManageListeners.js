import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ContentTabs from '../../components/Navigation/ContentTabs';
import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

import { BiArrowToLeft, BiArrowToRight, BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const AdminManageListeners = () => {

    const navigate = useNavigate();

    const {
        tabs,
        users,
        result,
        setResult,
        activeTab,
    } = useUser();

    const breadcrumbs = [
        { label: 'Manage Listeners', link: '/admin/listeners' },
    ];

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true,
            width: '70px'
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
            name: 'Created At',
            selector: row => {
                const date = new Date(row.created_at);
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
            },
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.user_type.user_type,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status_type.status_type,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => {
                const actionComponents = activeTab.actions.map(
                    (action, i) => action(row.id, i));

                return (
                    <div>
                        {actionComponents}
                    </div>
                );
            }
        },
    ];

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


    const handleQueryChange = (event) => {
        const searchFilter = event.target.value.toLowerCase();

        const newResult = users.filter(row => {
            return columns.some(column => {
                const columnSelector = String(column.selector);
                const indexOfDot = columnSelector.indexOf('.') + 1;
                const columnName = columnSelector.substring(indexOfDot, columnSelector.length);

                const columnValue = String(row[columnName]).toLowerCase();
                return columnValue.includes(searchFilter);
            });
        });

        if (String(searchFilter).length === 0) {
            setResult(activeTab.filter(users));
        } else {
            setResult(newResult);
        }
    };



    return (
        <div className='admin-normal-container'>
            <div className='admin-content-header'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className='d-flex justify-content-between'>
                <ContentTabs/>
                <input
                    className='form-control w-25'
                    type="text"
                    placeholder="Search"
                    onChange={handleQueryChange}
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