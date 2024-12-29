import React from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import MenuBar from './menuBar';
import StaticHeader from './header';

const Home: React.FC = () => {
    return (
        <div className='Home d-flex' style={{ background: "rgb(240 240 240)" }}>
            <MenuBar />
            <div className="w-100 d-flex flex-column">
                <StaticHeader />
                <div className="d-flex align-items-center justify-content-center h-100 w-100 g-0 p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;