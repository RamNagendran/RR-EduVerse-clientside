import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserDrawer from "./userDrawer";
import { RootState } from "../../../stateManager/types";

const StaticHeader: React.FC = memo(() => {
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);
    const [openDrawer, setOpenDrawer] = useState(false);

    const title = useMemo(() => {
        const filtered = location.pathname.slice(1).split("/");
        return filtered.join(` / `);
    }, [location.pathname]);

    const getInitials = useCallback((name: string) => {
        const nameParts = name.split(' ');
        if (nameParts.length >= 2) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    }, []);

    const userInitials = useMemo(() => {
        return (user?.firstname && user?.lastname)
            ? getInitials(`${user.firstname} ${user.lastname}`)
            : 'U';
    }, [user, getInitials]);

    const handleOpenDrawer = useCallback(() => {
        setOpenDrawer(true);
    }, []);

    return (
        <div className="header p-1">
            <div className="page-title">{title}</div>
            <div
                className="user-circle"
                onClick={handleOpenDrawer}
                role="button"
                aria-label="Open user menu"
            >
                {userInitials}
            </div>
            <UserDrawer
                user={user}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
            />
        </div>
    );
});

export default StaticHeader;