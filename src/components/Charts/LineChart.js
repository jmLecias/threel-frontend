import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';


const LineChart = ({ title, data, options, }) => {

    const [timeInterval, setTimeInterval] = useState('months');

    const downloadsDataMonthly = [1000000, 1500000, 500000, 1800000, 700000, 62000, 320000, 180000, 14000, 55600, 9000, 43000];
    const downloadsLabelsMonthly = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const downloadsDataYearly = [4000000, 12000000, 6180000];
    const downloadsLabelsYearly = ['2022', '2023', '2024'];

    const downloadsHighestIndexMonthly = downloadsDataMonthly.indexOf(Math.max(...downloadsDataMonthly));
    const downloadsHighestLabelMonthly = downloadsLabelsMonthly[downloadsHighestIndexMonthly];
    const totalDownloadsMonthly = downloadsDataMonthly.reduce((acc, cur) => acc + cur, 0);

    const downloadsHighestIndexYearly = downloadsDataYearly.indexOf(Math.max(...downloadsDataYearly));
    const downloadsHighestLabelYearly = downloadsLabelsYearly[downloadsHighestIndexYearly];
    const totalDownloadsYearly = downloadsDataYearly.reduce((acc, cur) => acc + cur, 0);

    const downloadsChart = {
        labels: downloadsLabelsMonthly,
        datasets: [
            {
                label: timeInterval === 'months' ? 'App Downloads (Monthly)' : 'App Downloads (Yearly)',
                data: timeInterval === 'months' ? downloadsDataMonthly : downloadsDataYearly,
                backgroundColor: 'rgba(255, 255, 0, 0.5)', // Semi-transparent fill color
                borderColor: '#f94141',
                borderWidth: 2, // Thicker border for better visibility
                tension: 0.3, // Adjust tension for smoother curves
            },
        ],
    };

    const linechartOptions = {
        maintainAspectRatio: false,
        responsive: false, // Make the chart responsive
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Number of Downloads',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.03)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    font: {
                        size: 12,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                bodyColor: '#fff',
                bodyFont: {
                    size: 12,
                },
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${value} downloads`;
                    },
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
        <div className='chart-container span-2 box-shadow'>
            <h5>{title}</h5>
            <div>
                <Chart type="line" data={downloadsChart} options={linechartOptions} height={300} width={700} />
                <p className="">    Highest Downloads: <strong className="text-warning">
                    {timeInterval === 'months' ? downloadsHighestLabelMonthly : downloadsHighestLabelYearly}
                </strong></p>
                <p>Total Downloads: <strong className="text-warning">
                    {timeInterval === 'months' ? formatTotalListeners(totalDownloadsMonthly) : formatTotalListeners(totalDownloadsYearly)}
                </strong></p>
            </div>
        </div>
    );
}

export default LineChart;