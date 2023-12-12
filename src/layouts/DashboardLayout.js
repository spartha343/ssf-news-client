import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import Header from '../components/header/Header';

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />

                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content`}>
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard'>Control users</Link></li>
                        <li><Link to='/dashboard/post-news'>Post News</Link></li>
                        <li className='bottom-5 lg:bottom-20 fixed w-11/12'><Link to='/'><IoMdArrowBack size={18} /> Leave Dashboard</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;