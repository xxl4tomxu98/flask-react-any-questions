import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { useHistory, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/LogoMd.svg';
import { ReactComponent as Search } from '../assets/Search.svg';
import './NavBar.css';



const NavBar = () => {

    const isAuthenticated = useSelector(state => state.authentication.id);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }
    const handleClickHome = () => {
        history.push('/')
    }

    const handleClickUser = () => {
      history.push('/users')
    }

    const handleProfile = (e, { name }) => {
        history.push('/profile')
    }

    const history = useHistory()


    const authLinks = (
      <div className='btns'>
          <Link onClick={ handleLogout } to='/login'>
              <button type='button' className='s-btn s-btn__filled'>Log out</button>
          </Link>
      </div>
    );

    const authTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Products</Link>
        </div>
    );

    const guestTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Products</Link>
            <Link to='/' className="s-navigation--item not-selected">Customers</Link>
            <Link to='/' className="s-navigation--item not-selected">Use cases</Link>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
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
