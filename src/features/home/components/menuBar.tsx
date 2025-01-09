import React, { memo, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../../stateManager/reducer/auth.slice';
import { clearRoles } from "../../../stateManager/reducer/roles.slice";
import { AppDispatch } from "../../../stateManager/reducer/store";

import './scss/menuBar.scss';
import { Image } from "react-bootstrap";

// menu icons
import RRPROJX from '../../../assets/images/SVGs/rrprojx.svg';
import ViewCourseIcon from '../../../assets/images/SVGs/icn_viewCourse';
import BatchIcon from '../../../assets/images/SVGs/icn_viewBatch';
import AnalyzeIcon from '../../../assets/images/SVGs/analyze_data';
import Logout from '../../../assets/images/SVGs/logout.svg';
import EmpIcon from '../../../assets/images/SVGs/icn_viewEmp';
import AuthIcon from '../../../assets/images/SVGs/auth-icon';

import { MenuItem } from "../types/home.type";
import { RootState } from "../../../stateManager/types";
import { IPermissonPack } from "../../pages/authorization/types/auth.type";

const MENU_ICON_MAP = {
    'DASHBOARD': AnalyzeIcon,
    'COURSE': ViewCourseIcon,
    'BATCH': BatchIcon,
    'PERSONNEL': EmpIcon,
    'AUTHORIZATION': AuthIcon
} as const;

const DESIRED_ORDER: string[] = ['DASHBOARD', 'COURSE', 'BATCH', 'PERSONNEL', 'AUTHORIZATION'];

const MenuBar: React.FC = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { loggedUser_perms = {} } = useSelector((state: RootState) => state.roles);

    const menuItems = useMemo(() => {
        return DESIRED_ORDER.reduce((acc: MenuItem[], prm: string) => {
            const permissions = loggedUser_perms[prm as keyof IPermissonPack];
            if (permissions && permissions?.length > 0 && permissions.includes('READ')) {
                acc.push({
                    path: `/home/${prm.toLowerCase()}`,
                    label: prm,
                    icon: MENU_ICON_MAP[prm as keyof typeof MENU_ICON_MAP]
                });
            }
            return acc;
        }, []);
    }, [loggedUser_perms]);

    const isActive = useCallback((path: string): boolean =>
        location.pathname === path || location.pathname.includes(path),
        [location.pathname]
    );

    const renderMenuItem = useCallback(({ path, label, icon: Icon }: MenuItem): JSX.Element => {
        const isItemActive = isActive(path);
        return (
            <div
                key={path}
                onClick={() => navigate(path)}
                className={isItemActive ? "icon-box" : "preSelect-box"}
            >
                <Icon stroke={isItemActive ? "#fff" : "rgba(80, 83, 95, 1)"} />
                <div className="d-none d-lg-block">{label}</div>
            </div>
        );
    }, [navigate, isActive]);

    const handleLogout = useCallback((): void => {
        localStorage.removeItem('authToken');
        dispatch(clearAuth());
        dispatch(clearRoles());
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div className="menuBar d-flex flex-column align-items-center justify-content-between p-2">
            <div className="d-flex flex-column align-items-center mt-1 w-100">
                <Image
                    fluid
                    src={RRPROJX}
                    style={{ marginBottom: "20px", width: "75%" }}
                    alt="RR ProjX Logo"
                />
                {menuItems.map(renderMenuItem)}
            </div>
            <div
                onClick={handleLogout}
                className="preSelect-box"
                role="button"
                aria-label="Logout"
            >
                <img
                    src={Logout}
                    height={18}
                    width={18}
                    alt="logout-icon"
                />
                <div className="d-none d-lg-block">LOGOUT</div>
            </div>
        </div>
    );
});

export default MenuBar;