import React, { useCallback, useEffect, useState } from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUsers } from '../api/users.api';
import { useSelector } from 'react-redux';
import { IBaseResponse, Iuser } from '../types/personnel.type';
import Nodata from '../../../../assets/images/SVGs/noData.svg';
import { Button } from 'react-bootstrap';
import UsersTable from './users-table';
import AddUser from './addUser';

type IResponse = IBaseResponse<Iuser[]> | IBaseResponse;

const Personnel: React.FC = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleClick = () => {
        setOpenModal(true)
    }

    const { user } = useSelector((state: any) => state.auth)
    const [users, setUsers] = useState<Iuser[]>([]);
    const [preFetch, setPreFetch] = useState({ loading: false, message: '' });

    const getUsers = useCallback(async () => {
        setPreFetch({ loading: true, message: '' });

        const res: IResponse = await fetchUsers({ username: user.username, role_id: user.role_id });
        if (!res.success) {
            setPreFetch({ loading: false, message: res?.message });
            return;
        }

        setPreFetch({ loading: false, message: '' });
        setUsers(res?.data || []);
    }, [user.username, user.role_id]);

    useEffect(() => {
        getUsers()
    }, [getUsers])


    return (
        <div className='personnel'>
            <div className='header'>
                <div className='d-flex align-items-center justify-content-end w-25'>
                    {/* <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                    <Button className='add-button' onClick={handleClick}  >+ USER</Button>
                </div>

            </div>
            {(!preFetch.loading && users.length > 0) && <UsersTable users={users} />}
            {preFetch.loading && <div className="loading-spinner d-flex align-items-center justify-content-center h-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>}
            {!preFetch.loading && users.length === 0 &&
                <div className='d-flex flex-column align-items-center justify-content-center h-100' >
                    <img style={{ width: '450px', height: '450px' }} src={Nodata} alt="no-data" />
                    {preFetch.message !== '' &&
                        <div style={{ color: '#aeaeae', fontSize: '16px', fontWeight: 700 }} >
                            Something went wrong: <small>{preFetch.message}</small>
                        </div>
                    }
                </div>}
            {openModal && <AddUser getUsers={getUsers} openModal={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
};

export default Personnel;