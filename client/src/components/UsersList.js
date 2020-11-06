import React, { useEffect, useState, Fragment } from 'react';
import './UsersPage.css'
import SideBar from './HomePage/SideBar';
import RightSideBar from './HomePage/RightSideBar';
import Spinner from "./Spinner";
import User from './User';

function UsersList(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);


    return users === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id='content'>
                <div id='mainbar' className='users-page fc-black-800'>
                    <h1 className='headline'>Users</h1>
                    <div className='headline-count'>
                        <span>1,025 users</span>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                          {users.map((user) => <User key={user.id} user={user} />)}
                        </div>
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
}

export default UsersList;
