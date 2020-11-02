import React from 'react';
import styled from 'styled-components';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { useHistory, Redirect } from 'react-router-dom';
import './NavBar.css';

const NavBarWrapper = styled.div`
  margin: 0;
  background-color: #da3743;
  padding: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  display: flex;
  .nav-bar-content {
    margin: 0 auto;
    display: flex;
    height: 50px;
  }
`;

const NavBar = () => {
    const authSelector = useSelector(state => state.authentication)
    const loggedOut = authSelector.id;
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

    if (!loggedOut) {
        return <Redirect to="/login" />;
    }

    return (
        <NavBarWrapper>
            <Menu fixed='top' inverted >
                <Container className="nav-bar-content">
                    <Menu.Item onClick={handleClickUser}>
                        Users</Menu.Item>
                    <Menu.Item onClick={handleClickHome} header>
                        <Image size='mini' src='https://cdn2.iconfinder.com/data/icons/flat-pro-word-processing-set-5/32/table-512.png' style={{ marginRight: '1.5em' }} />
                        Any Questions?
                    </Menu.Item>
                    {authSelector.user_name && <Dropdown item simple text={`Hi ${authSelector.user_name}`}>
                        <Dropdown.Menu>
                            <Dropdown.Header>Your Reputation Score: {authSelector.points}/2000 !</Dropdown.Header>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {!authSelector.user_name && <Menu.Item>Login</Menu.Item>}
                </Container>
            </Menu>
        </NavBarWrapper>
    )
}

export default NavBar;
