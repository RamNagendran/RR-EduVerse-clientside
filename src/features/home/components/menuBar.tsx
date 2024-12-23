import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../../stateManager/reducer/auth.slice';

import './scss/menuBar.scss';
import { Image } from "react-bootstrap";

// menu icons...
import RRPROJX from '../../../assets/images/SVGs/rrprojx.svg';
import ViewCourseIcon from '../../../assets/images/SVGs/icn_viewCourse';
import SLAICON from '../../../assets/images/image/sla.jpeg'
import BatchIcon from '../../../assets/images/SVGs/icn_viewBatch';
import AnalyzeIcon from '../../../assets/images/SVGs/analyze_data';
import Logout from '../../../assets/images/SVGs/logout.svg';
import EmpIcon from '../../../assets/images/SVGs/icn_viewEmp';
import AuthIcon from '../../../assets/images/SVGs/auth-icon';

import { MenuItem } from "../types/home.type";



/**
 * MenuBar Component - Renders the navigation sidebar with menu items and handles navigation
 * @returns {JSX.Element} MenuBar component UI
 */
const MenuBar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    /**
     * Configuration array for menu items
     * Each item contains:
     * @property {string} path - Route path for navigation
     * @property {string} label - Display text for the menu item
     * @property {ComponentType} icon - Icon component to render
     */
    const menuItems: MenuItem[] = [
        {
            path: '/home/dashboard',
            label: 'DASHBOARD',
            icon: AnalyzeIcon
        },
        {
            path: '/home/course',
            label: 'COURSE',
            icon: ViewCourseIcon
        },
        {
            path: '/home/batch',
            label: 'BATCH',
            icon: BatchIcon
        },
        {
            path: '/home/personnel',
            label: 'PERSONNEL',
            icon: EmpIcon
        },
        {
            path: '/home/authorization',
            label: 'AUTHORIZATION',
            icon: AuthIcon
        }
    ];


    /**
     * Determines if a menu item is currently active
     * @param {string} path - Route path to check
     * @returns {boolean} True if current location matches or includes the path
     */
    const isActive = (path: string): Boolean => {
        return location.pathname === path ||
            location.pathname.includes(path);
    };

    /**
    * Renders an individual menu item with its icon and styling
    * @param {MenuItem} param0 - Destructured MenuItem properties
    * @param {string} param0.path - Route path for the menu item
    * @param {string} param0.label - Display text
    * @param {ComponentType} param0.icon - Icon component
    * @returns {JSX.Element} Rendered menu item
    */
    const renderMenuItem = ({ path, label, icon: Icon }: MenuItem): JSX.Element => {
        return (
            <div
                key={path}
                onClick={() => navigate(path)}
                className={isActive(path) ? "icon-box" : "preSelect-box"}
            >
                <Icon stroke={isActive(path) ? "#fff" : "rgba(80, 83, 95, 1)"} />
                <div className="d-none d-lg-block" >{label}</div>
            </div>
        )
    };

    /**
     * Handles user logout action
     * Clears authentication and redirects to login page
     * @returns {void}
     */
    function handleLogout(): void {
        localStorage.removeItem('authToken');
        dispatch(clearAuth())
        navigate('/')
    }

    return (
        <div className="menuBar d-flex flex-column align-items-center justify-content-between p-2">
            <div className="d-flex flex-column align-items-center mt-1 w-100">
                <Image fluid src={RRPROJX} style={{marginBottom: "20px", width: "75%" }} />
                {menuItems.map(renderMenuItem)}
            </div>
            <div onClick={handleLogout} className="preSelect-box">
                <img src={Logout} height={18} width={18} alt="logout-icon" />
                <div className="d-none d-lg-block" >LOGOUT</div>
            </div>
        </div>
    )
}

export default MenuBar;
