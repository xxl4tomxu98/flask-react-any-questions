import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/quiz.svg';
import { ReactComponent as Search } from '../assets/Search.svg';
import './NavBar.css';



const NavBar = () => {

    const isAuthenticated = useSelector(state => state.authentication.id);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }

    const authLinks = (
      <>
        <div className='btns'>
            <h4 className='logo-text'> Any Questions ?</h4>
            <Link onClick={ handleLogout } to='/login'>
                <button type='button' className='s-btn s-btn__filled'>Log out</button>
            </Link>
            <Link to='/currentUser'>
                <button type='button' className='s-btn s-btn__filled'>Profile</button>
            </Link>
        </div>
      </>
    );

    const authTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Moderators</Link>
        </div>
    );

    const guestTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">  Topics  </Link>
            <Link to='/' className="s-navigation--item not-selected">  Statistics  </Link>
            <Link to='/' className="s-navigation--item not-selected">  Catagories  </Link>
            <Link to='/' className="s-navigation--item not-selected">  Notifications  </Link>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
            <h4 className='logo-text'> Any Questions ?</h4>
            <Link to='/login'>
                <button type='button' className="s-btn s-btn__primary">Log in</button>
            </Link>
            <Link to='/signup'>
                <button type='button' className='s-btn s-btn__filled'>Sign up</button>
            </Link>
        </div>

    );


    return (
        <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
            <Link className='navbar-brand' to='/'>
                <Logo/>
            </Link>
            <br></br>
            <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
            <form id="search" role="search" method="get"
                  className="grid--cell fl-grow1 searchbar px12 js-searchbar " autoComplete="off">
                <div className="ps-relative">
                    <input name="q"
                          type="text"
                          placeholder="Search&#x2026;"
                          maxLength="240"
                          className="s-input s-input__search js-search-field "/>
                          <Search/>
                </div>
            </form>
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </nav>
    )
}

export default NavBar;
