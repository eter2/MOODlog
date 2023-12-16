import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Loginbox from './Loginbox.js';
import Home from './Home.js';
import AdminPage from './Adminpage.js';
import PrivateRoute from './PrivateRoute.js';
import Scroll from '../Components/Scroll.js';

const Router = () => {
    const access = localStorage.getItem('login');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const handleLoginSuccess = () => {
      navigate(`/${userId}`);
    }

    return (
        <>
        <Scroll />
        <Routes>
            <Route index element={access === "true" ? <Navigate to={`/${userId}`} /> : <Loginbox handleLoginSuccess={handleLoginSuccess} />} path="/login/*" />
            <Route path={`/*`} element={<PrivateRoute
                authenticated={access}
                component={<Home/>}/>}/>
            <Route path="/admin/*" element={<PrivateRoute
                authenticated={access}
                component={<AdminPage/>}/>}/>
        </Routes>
        </>
    );
};

export default Router;