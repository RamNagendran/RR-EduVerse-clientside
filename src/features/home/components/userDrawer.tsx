import React from 'react';
import { getRoleDescription, ROLE } from '../../../common/constants';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserDrawerProps } from '../types/home.type';
import RRPROJX from '../../../assets/images/SVGs/rrprojx.svg';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

const UserDrawer: React.FC<UserDrawerProps> = ({ openDrawer, setOpenDrawer, user }) => {

    const roleBadge = (): JSX.Element => {
        const role = ROLE[user.role_id];
        return (
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip>{getRoleDescription(role)}</Tooltip>}
            >
                <div className='role-badge' data-role={role}>{role}</div>
            </OverlayTrigger>
        );
    }

    return (
        <Offcanvas show={openDrawer} placement="end" style={{ width: "480px" }} className="user-drawer">
            <Offcanvas.Header className="d-header border-bottom">
                <div onClick={() => setOpenDrawer(false)} className='close-icon'>✗</div>
                <Offcanvas.Title className='w-100  d-flex align-items-center justify-content-between' >
                    <div className="d-flex align-items-center gap-2">
                        <div className="default-avatar rounded-circle text-white d-flex align-items-center justify-content-center">
                            {user.firstname[0]}{user.lastname[0]}
                        </div>
                        <div className='d-flex flex-column align-items-start' >
                            <div className="flname">{user.firstname} {user.lastname}</div>
                            <small className="username">@{user.username}</small>
                        </div>
                    </div>
                    {roleBadge()}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="user-info-section">
                    <div className="info-card mb-4 p-2 border rounded">
                        <h5>User Information:</h5>
                        <div className='p-2 d-flex align-items-center justify-content-between w-100' >
                            <div className='details-set' >
                                <div className=' title' >First Name</div>
                                <div title={user.firstname} className='content' >{user.firstname}</div>
                            </div>
                            <div className='details-set' >
                                <div className=' title' >Last Name</div>
                                <div title={user.lastname} className='content' >{user.lastname}</div>
                            </div>
                        </div>
                        <div className='p-2 d-flex align-items-center justify-content-between w-100' >
                            <div className='details-set' >
                                <div className=' title' >Email</div>
                                <div title={user.email} className='content' style={{ textTransform: "lowercase" }}  >{user.email}</div>
                            </div>
                            <div className='details-set' >
                                <div className=' title' >Phone</div>
                                <div title={user.phone.toString()} className='content' style={{ textTransform: "lowercase" }} >+91 - {user.phone}</div>
                            </div>
                        </div>
                        <div style={{ marginBottom: "10px" }} className='p-2 d-flex align-items-center justify-content-between w-100' >
                            <div className='details-set' >
                                <div className=' title' >User Id</div>
                                <div title={user.user_id} className='content' style={{ textTransform: "lowercase" }} >{user.user_id}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
            <div className="border-top p-3">
                <div className="d-flex align-items-center justify-content-end">
                    <span style={{ fontSize: "10px", marginRight: "5px", color: "#a6a6a6" }}>Powered by</span>
                    <Image src={RRPROJX} style={{ height: "12px" }} />
                </div>
            </div>
        </Offcanvas>
    );
}

export default UserDrawer;