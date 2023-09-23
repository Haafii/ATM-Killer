import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

function HomePage() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isLiquifyOpen, setIsLiquifyOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [isDigitizeOpen, setIsDigitizeOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };
    const closeNotification = () => {
        setIsNotificationOpen(false);
    };


    const openLiquify = () => {
        setIsLiquifyOpen(true);
    };
    const closeLiquify = () => {
        setIsLiquifyOpen(false);
    };


    const openDigitize = () => {
        setIsDigitizeOpen(true);
    };
    const closeDigitize = () => {
        setIsDigitizeOpen(false);
    };

    const openSearch = () => {
        setIsSearch(true);
        setIsLiquifyOpen(false);
        setIsDigitizeOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <div className="bg-secondary w-1/2 h-2/3 justify-between rounded-lg shadow-lg text-center flex flex-col items-center ">
                <div className="bg-gray-700 w-full py-3 rounded-t-lg">
                    <div className="flex justify-between items-center px-4">
                        <LogoutIcon className="transform rotate-180 cursor-pointer" />
                        <NotificationsIcon className="cursor-pointer" onClick={openNotification} />
                    </div>
                </div>
                <div className="w-full flex items-center justify-center gap-2 flex-col">
                    <div className='flex justify-center items-center gap-2'>
                        <AccountBalanceIcon />
                        <p className='text-indigo-600 text-2xl'>ABC Payments Bank</p>
                    </div>
                    <div className='w-full flex justify-between p-4 bg-gray-400 shadow-lg rounded-lg'>
                        <p>Account Number</p>
                        <p>1234567890</p>
                    </div>
                    <div className="w-full flex justify-between p-4 bg-gray-400 shadow-lg rounded-lg">
                        <p>Bank IFSC</p>
                        <p>ABC000003</p>
                    </div>
                    <div className="w-full flex justify-between p-4 bg-gray-400 shadow-lg rounded-lg">
                        <p>Account Type</p>
                        <p>Savings</p>
                    </div>
                    <div className="w-full flex justify-between p-4 bg-gray-400 shadow-lg rounded-lg">
                        <p>Card Number</p>
                        <p>3532-3823-3937-4728</p>
                    </div>
                    <div className="w-full flex justify-between p-4 bg-gray-400 shadow-lg rounded-lg">
                        <p>Phone Number</p>
                        <p>9347257639</p>
                    </div>
                </div>
                <div className="bg-gray-700 w-full py-3 rounded-t-lg">
                    <div className="flex justify-between items-center px-4">
                        <div className="flex cursor-pointer flex-col justify-center items-center text-sm">
                            <AccountBalanceWalletIcon />
                            <p>Balance</p>
                        </div>
                        <div className="flex flex-col cursor-pointer justify-center items-center text-sm">
                            <HistoryIcon />
                            <p>History</p>
                        </div>
                        <div className="flex flex-col cursor-pointer justify-center items-center text-sm">
                            <DeviceUnknownIcon />
                            <p>Help</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex gap-2 w-1/3 items-center justify-center">
                <button className="group relative w-1/3 flex items-center gap-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={openLiquify}>
                    <CurrencyExchangeIcon />
                    Liquify Money
                </button>
                <button className="group items-center gap-1 relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={openDigitize}>
                    <CurrencyExchangeIcon />
                    Digitize Money
                </button>
            </div>


            <Dialog open={isNotificationOpen} onClose={closeNotification} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-indigo-600 text-white">Notifications</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-400 shadow-lg'>
                        <DialogContent className="p-4">
                            <p className="text-gray-800">Notification content goes here...</p>
                        </DialogContent>
                        <DialogActions className="p-4">
                            <Button onClick={closeNotification} className="bg-red-500 text-white hover:bg-red-600">
                                Reject
                            </Button>
                            <Button onClick={closeNotification} className="bg-green-500 text-white hover:bg-green-600 ml-2">
                                Accept
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>


            <Dialog open={isLiquifyOpen} onClose={closeLiquify} maxWidth="sm" >
                <DialogTitle className="bg-indigo-600 text-white">Liquify</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-400 shadow-lg'>
                        <DialogContent className="p-4">
                            <input
                                id="amount"
                                name="amount"
                                type="text"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Amount"
                            />
                        </DialogContent>
                        <DialogActions className="p-4">
                            <Button onClick={openSearch} className="bg-red-500 text-white hover:bg-red-600">
                                Search
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>

            <Dialog open={isDigitizeOpen} onClose={closeDigitize} maxWidth="sm" >
                <DialogTitle className="bg-indigo-600 text-white">Digitize</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-400 shadow-lg'>
                        <DialogContent className="p-4">
                            <input
                                id="amount"
                                name="amount"
                                type="text"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Amount"
                            />
                        </DialogContent>
                        <DialogActions className="p-4">
                            <Button onClick={openSearch} className="bg-red-500 text-white hover:bg-red-600">
                                Search
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>

        </div>
    );
}

export default HomePage;



