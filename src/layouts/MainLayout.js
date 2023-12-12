import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import useCategories from '../hooks/useCategories';
import HashLoading from '../components/loading/HashLoading';

const MainLayout = () => {
    const { isLoading } = useCategories();
    if (isLoading) {
        return <HashLoading />
    }
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;