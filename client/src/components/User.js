import React from 'react';


function User(props) {
    return (
        <>
            <strong>Username:</strong> {props.user.user_name}<br />
            <strong>Email:</strong> {props.user.email}<br />
            <hr />
        </>
    );
}
export default User;
