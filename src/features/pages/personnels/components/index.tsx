import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUsers } from '../api/users.api';
import { useSelector } from 'react-redux';
import { IBaseResponse, Iuser } from '../types/personnel.type';
import Nodata from '../../../../assets/images/SVGs/noData.svg';
import SearchIcon from '../../../../assets/images/SVGs/search.svg';
import { Button } from 'react-bootstrap';
import UsersTable from './users-table';
import AddUser from './addUser';
import RoleDropdown from './roleDropdown';

type IResponse = IBaseResponse<Iuser[]> | IBaseResponse;

const Personnel: React.FC = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleClick = () => {
        setOpenModal(true)
    }

    const { user } = useSelector((state: any) => state.auth);
    const [users, setUsers] = useState<Iuser[]>([]);
    const [usersBackup, setUsersBackup] = useState<Iuser[]>([]);
    const [preFetch, setPreFetch] = useState({ loading: false, message: '' });
    const [selectedRole, setSelectedRole] = useState<number>();
    const [searchData, setSearchData] = useState<string>('');

    const getUsers = useCallback(async () => {
        setPreFetch({ loading: true, message: '' });

        const res: IResponse = await fetchUsers({ username: user.username, role_id: user.role_id });
        if (!res.success) {
            setPreFetch({ loading: false, message: res?.message });
            return;
        }

        setPreFetch({ loading: false, message: '' });
        setUsers(res?.data || []);
        setUsersBackup(res?.data || []);
    }, [user.username, user.role_id]);

    useEffect(() => {
        getUsers()
    }, [getUsers])


    // Filter users based on selected role
    const filteredUsers = useMemo(() => {
        return selectedRole ? users.filter(user => user.role_id === Number(selectedRole)) : users;
    }, [users, selectedRole]);


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Trim and convert to lowercase for case-insensitive search
            const searchTerm = searchData.trim().toLowerCase();

            // If search term is empty, show all users
            if (!searchTerm) {
                setUsers(usersBackup);
                return;
            }

            // Filter users based on multiple search criteria
            const searchResults = users.filter(user =>
                user.username.toLowerCase().includes(searchTerm) ||
                user.firstname.toLowerCase().includes(searchTerm) ||
                user.lastname.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );

            // Update filtered users
            setUsers(searchResults);

            // Optional: Show message if no results found
            if (searchResults.length === 0) {
                // You might want to use a toast or set a state to show a message
                setPreFetch({ loading: false, message: 'No results found' });
            }

        }
    }


    return (
        <div className='personnel'>
            <div className='header' >
                <div className="position-relative d-flex align-items-center" >
                    <input className="search-input" placeholder="search by username, fullName, email..." type="search"
                        value={searchData || ''}
                        onKeyDown={handleKeyPress}
                        onChange={(e: any) => { setSearchData(e.target.value); if (e.target.value === '') setUsers(usersBackup) }}
                    />
                    <img style={{ left: 6, top: 7, position: 'absolute' }} height={14} width={14} src={SearchIcon} alt="search" />
                </div>
                <div className='d-flex align-items-center justify-content-end w-25'>
                    <RoleDropdown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                    <Button className='add-button' onClick={handleClick}  >+ USER</Button>
                </div>
            </div>
            {(!preFetch.loading && filteredUsers.length > 0) && <UsersTable users={filteredUsers} />}
            {preFetch.loading && <div className="loading-spinner d-flex align-items-center justify-content-center h-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>}
            {!preFetch.loading && filteredUsers.length === 0 &&
                <div className='d-flex flex-column align-items-center justify-content-center h-100' >
                    <img style={{ width: '450px', height: '450px' }} src={Nodata} alt="no-data" />
                    {preFetch.message !== '' &&
                        <div style={{ color: '#aeaeae', fontSize: '18px', fontWeight: 700 }} >
                            Something went wrong: {preFetch.message}
                        </div>
                    }
                </div>}
            {openModal && <AddUser getUsers={getUsers} openModal={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
};

export default Personnel;