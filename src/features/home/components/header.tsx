import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserDrawer from "./userDrawer";

function StaticHeader() {
    const location = useLocation();

    const { user } = useSelector((state: any) => state.auth);
    const [openDrawer, setOpenDrawer] = useState(false);

    function title() {
        const filtered = location.pathname.slice(1).split("/")
        return filtered.join(` / `);
    }

    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        if (nameParts.length >= 2) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <React.Fragment>
            <div className="header p-1 p-sm-2"  >
                <div className="page-title" >{title()}</div>
                <div className="user-circle" onClick={() => setOpenDrawer(true)}>
                    {(user?.firstname && user?.lastname) ? getInitials(`${user.firstname} ${user.lastname}`) : 'U'}
                </div>
                <UserDrawer user={user} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            </div>
        </React.Fragment>
    )
}

export default StaticHeader;