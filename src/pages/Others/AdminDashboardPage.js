import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import ThreelModal from '../../components/ThreelModal';
import threel_api from '../../backend/api';
import StorageService from '../../services/StorageService';
import Button from 'react-bootstrap/Button';
import AdminNav from '../../components/AdminSideNav';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminDashboard() {

    const ss = new StorageService();
    const urlParams = new URLSearchParams(window.location.search);


    const navigate = useNavigate();
    const [isCooldown, setIsCooldown] = useState(false);
    const { logout, me, user } = useAuth();

    const [isEmailVerified, setIsEmailVerified] = useState(
        JSON.parse(ss.getItem('user')).email_verified_at !== null);


    const [modal, setModal] = useState({
        show: false,
        title: '',
        description: '',
        close: '',
        action: '',
        onClose: () => { },
        onAction: () => { },
    });

    const [logoutText, setLogoutText] = useState("Logout");

    useEffect(() => {
        const status = urlParams.get('status');

        me().then(() => {
            setIsEmailVerified(JSON.parse(ss.getItem('user')).email_verified_at !== null);
        }).catch((error) => {
            console.log(error);
        });


        if (status === 'verification_success') {
            setModal({
                show: true,
                title: 'Verification Successful',
                description: 'Congratulations, you have successfully verified your email address. You can now access more feautures on Threel!',
                close: 'Close',
                action: '',
                onClose: () => {
                    setModal({ show: false });
                    navigate('/adminboard');
                },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'verification_sent') {
            setModal({
                show: true,
                title: 'Verify Email Address',
                description: 'An email address verification link was sent to you. Please check your email and verify email address to continue using Threel!',
                close: 'Close',
                action: '',
                onClose: () => {
                    setModal({ show: false });
                    navigate('/adminboard');
                },
                onAction: () => { setModal({ show: false }) }
            });
        }
        if (status === 'already_verified') {
            toast.error("Email already verified", {
                autoClose: 3000,
                onClose: () => { navigate('/adminboard') },
                pauseOnHover: true,
            });
        }
        if (status === 'verification_error') {
            toast.error("Error while verifying email", {
                autoClose: 3000,
                onClose: () => { navigate('/adminboard') },
                pauseOnHover: true,
            });
        }
    }, []);


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
                autoClose: 3000,
                pauseOnHover: true,
            });
        });
    }

    const handleCooldown = () => {
        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        },  30000); 
    };

    const handleVerify = (event) => {
        event.preventDefault();
        if (isCooldown) return; 
        handleCooldown(); 
        const credentials = {
            id: JSON.parse(ss.getItem('user')).id,
        }
        threel_api.post('/email/send-verification', credentials).then((response) => {
            if (response.status === 200) {
                toast.info(response.data.status, {
                    autoClose: 3000,
                    pauseOnHover: true,
                });
            }
        }).catch((error) => {
            toast.error("Error while logging out", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });

    }


    // other code...

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
            <ToastContainer />
            <ThreelModal
                action={modal.action}
                title={modal.title}
                description={modal.description}
                show={modal.show}
                close={modal.close}
                onClose={modal.onClose}
                onAction={modal.onAction}
            />
            <div className="row" >
                <div className={`col-md-3`}>
                    <AdminNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
                </div>
                <div className="column"style={{ marginLeft: '400px' , width: '74%'}}>
                    <h1 className="text-white fw-bold">APP STATISTICS</h1>
                    {!isEmailVerified && (
                        <>
                            <h5 className='text-white'>Did not receive email verification? Click the resend button below.</h5>
                            <Button variant="primary" onClick={handleVerify} disabled={isCooldown}>
                                Resend 
                            </Button>
                        </>
                    )}
                    <br/>
                    <div className="column">
                        <div className="col">
                            <div className={`card col-md-8`} style={{ width: '90%', marginLeft: '40px'}}>
                                <div className="card-body bg-dark">
                                    <h3 className="card-title text-danger fw-bold d-flex align-items-center">App Downloads 
                                    <select className="form-select ms-auto" value={timeInterval} onChange={handleIntervalChange} style={{ fontSize: 'small', width: '100px' }}>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select></h3>
                                    
                                    <div className="chart-container d-flex justify-content-between align-items-center">
                                        <Chart type="line" data={downloadsChart} options={linechartOptions} height={300} width={800} />
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
                        <br/>
                        <br/>
                        <div className="col ">
                            <div className={`card col-md-8`} style={{ width: '90%',  marginLeft: '40px'}}>
                                <div className="card-body bg-dark p-5">
                                    <h3 className="card-title text-danger fw-bold">Listeners</h3>
                                    <div className="chart-container d-flex justify-content-between align-items-center">
                                        <Chart type="pie" data={freeChart} options={piechartOptions} height={300} width={500} />
                                        <p className="text-white fw-bold">Most Number of Users: <strong className="text-danger">{percentages[freeHighestIndex]}%</strong> of Users are {freeHighestLabel}
                                            <br /><br />Total Listeners: <strong className="text-danger">{formatTotalListeners(totalUsers)}</strong> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;