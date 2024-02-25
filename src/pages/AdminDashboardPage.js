import React, { useState } from 'react';
import AdminNav from './AdminSideNav';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminDashboard() {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [timeInterval, setTimeInterval] = useState('months');

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const downloadsDataMonthly = [1000000, 1500000, 500000, 1800000, 700000, 62000, 320000, 180000, 14000, 55600, 9000, 43000];
    const downloadsLabelsMonthly = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const downloadsDataYearly = [4000000, 12000000, 6180000];
    const downloadsLabelsYearly = ['2022','2023', '2024'];

    const downloadsHighestIndexMonthly = downloadsDataMonthly.indexOf(Math.max(...downloadsDataMonthly));
    const downloadsHighestLabelMonthly = downloadsLabelsMonthly[downloadsHighestIndexMonthly];
    const totalDownloadsMonthly = downloadsDataMonthly.reduce((acc, cur) => acc + cur, 0);

    const downloadsHighestIndexYearly = downloadsDataYearly.indexOf(Math.max(...downloadsDataYearly));
    const downloadsHighestLabelYearly = downloadsLabelsYearly[downloadsHighestIndexYearly];
    const totalDownloadsYearly = downloadsDataYearly.reduce((acc, cur) => acc + cur, 0);

    const downloadsChart = {
        labels: timeInterval === 'months' ? downloadsLabelsMonthly : downloadsLabelsYearly,
        datasets: [
            {
                label: timeInterval === 'months' ? 'App Downloads (Monthly)' : 'App Downloads (Yearly)',
                data: timeInterval === 'months' ? downloadsDataMonthly : downloadsDataYearly,
                backgroundColor: 'black',
                borderColor: 'red',
                borderWidth: 1,
            },
        ],
    };

    const linechartOptions = {
        maintainAspectRatio: false,
        responsive: false,
        scales: {
            y: {
                grid: {
                    color: 'white'
                }
            },
            x: {
                grid: {
                    color: 'white'
                }
            }
        }
    };

    const handleIntervalChange = (event) => {
        setTimeInterval(event.target.value);
    };

    const freeData = [5245000, 314200, 620000];
    const freeLabels = ['Free', 'Tier I', 'Tier II'];
    const totalUsers = freeData.reduce((acc, cur) => acc + cur, 0);
    const freeHighestIndex = freeData.indexOf(Math.max(...freeData));
    const freeHighestLabel = freeLabels[freeHighestIndex];
    const percentages = freeData.map(value => ((value / totalUsers) * 100).toFixed(2));


    const freeChart = {
        labels: freeLabels.map((label, index) => `${label}: ${percentages[index]}%`),
        datasets: [
            {
                label: 'Listeners',
                data: freeData,
                backgroundColor: ['maroon', 'white', 'gold'],
                borderColor: 'gray',
                borderWidth: 2,
            },
        ],
    };

    const piechartOptions = {
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
            datalabels: {
                anchor: 'end',
                formatter: (value, context) => {
                    const percentage = (value / context.chart.config.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)) * 100;
                    return `${percentage.toFixed(2)}%`;
                },
            },
        },
    };

    const formatTotalListeners = (totalUsers) => {
        if (totalUsers >= 1e9) {
            return (totalUsers / 1e9).toFixed(2) + 'b';
        }
        if (totalUsers >= 1e6) {
            return (totalUsers / 1e6).toFixed(2) + 'm';
        }
        if (totalUsers >= 1e3) {
            return (totalUsers / 1e3).toFixed(2) + 'k';
        }
        return totalUsers.toString();
    };

    return (
        <div className="container-fluid d-flow dash" style={{ overflowX: 'hidden' }}>
            <div className="row" >
                <div className={`col-md-${isSideNavOpen ? 3 : 12}`}>
                    <AdminNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
                </div>
                <div className={`col-md-${isSideNavOpen ? 9 : 12}`}>
                    <button className="btn float-end" onClick={toggleSideNav} role="button">
                        <p className={`bi bi-${isSideNavOpen ? 'arrow-right-square-fill' : 'arrow-left-square-fill'} fs-3 text-white`}>+</p>
                    </button>
                    <h1 className="text-white fw-bold">APP STATISTICS</h1>
                    <div className="row">
                        <div className="col">
                            <div className={`card col-md-${isSideNavOpen ? 8 : 10}`} >
                                <div className="card-body bg-dark">
                                    <h3 className="card-title text-danger fw-bold d-flex align-items-center">App Downloads 
                                    <select className="form-select ms-auto" value={timeInterval} onChange={handleIntervalChange} style={{ fontSize: 'small', width: '100px' }}>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select></h3>
                                    
                                    <div className="chart-container d-flex justify-content-between align-items-center">
                                        <Chart type="line" data={downloadsChart} options={linechartOptions} height={300} width={500} />
                                        <p className="text-white fw-bold">    Highest Downloads: <strong className="text-warning">
                                            {timeInterval === 'months' ? downloadsHighestLabelMonthly : downloadsHighestLabelYearly}
                                        </strong><br /><br />
                                            Total Downloads: <strong className="text-warning">
                                                {timeInterval === 'months' ? formatTotalListeners(totalDownloadsMonthly) : formatTotalListeners(totalDownloadsYearly)}
                                            </strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`card col-md-${isSideNavOpen ? 8 : 10}`}>
                                <div className="card-body bg-dark">
                                    <h3 className="card-title text-danger fw-bold">Listeners</h3>
                                    <div className="chart-container d-flex justify-content-between align-items-center">
                                        <Chart type="pie" data={freeChart} options={piechartOptions} height={300} width={500} />
                                        <p className="text-white fw-bold">Most Number of Users: <strong className="text-danger">{percentages[freeHighestIndex]}%</strong> of Users are {freeHighestLabel}
                                            <br /><br />Total Listeners: <strong className="text-danger">{formatTotalListeners(totalUsers)}</strong> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
