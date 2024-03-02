import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';


const PieChart = ({ title, data, options, }) => {

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
                backgroundColor: ['#f94141', 'white', 'yellow'],
                borderColor: 'gray',
                borderWidth: 0,
            },
        ],
    };

    const piechartOptions = {
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
            legend: {
                display: true,
                position: 'left' 
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        const label = context.chart.data.labels[context.dataIndex] || '';
                        const value = context.dataset.data[context.dataIndex];
                        const percentage = (value / context.chart.config.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)) * 100;
                        return `${label}: ${percentage.toFixed(2)}%`;
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 0 // This removes the borders
            }
        }
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
        <div className="chart-container box-shadow">
            <h5>{title}</h5>
            <div className="">
                <Chart type="doughnut" data={freeChart} options={piechartOptions} height={200} width={300} />
                <br />
                <p>Most Number of Users: <strong className="text-danger">{percentages[freeHighestIndex]}%</strong></p>
                <p>Total Listeners: <strong className="text-danger">{formatTotalListeners(totalUsers)}</strong> </p>
            </div>
        </div>
    );
}

export default PieChart;