import React from 'react';
import { NavLink } from 'react-router-dom';


const Logo = () => {
    return (
        <NavLink
            to="/"
            style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '15px',
                height: '50px',
                margin: "0 0 0 10px",
                display: "inline-block",
                fontWeight: "bold",
                fontFamily: '"Lato", "Helvetica Neue", "Helvetica", sans-serif',
                textAlign: "center",
                lineHeight: "50px",
            }}
        >

        </NavLink>
    );
};

export default Logo;
