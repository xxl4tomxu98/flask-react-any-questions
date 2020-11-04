import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile';
import UsersList from './components/UsersList'
import { setCsrfFunc } from './store/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let needLogin = useSelector(state => !state.authentication.id);
    return (
        <Route {...rest} render={(props) => (
            needLogin
                ? <Redirect to='/login' />
                : <Component {...props} />
        )} />
    )
}

function App() {

    let location = useLocation();
    let dispatch = useDispatch();
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);


    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);

    return (
        <>
            {location.pathname !== '/login' && location.pathname !== '/signup' ?
                <NavBar />
                : null}
            <Switch>
                <Route path="/login" component={LoginPanel} />
                <PrivateRoute
                    path="/users/:id"
                    exact={true}
                    component={Profile}
                />
                <Route
                    path="/signup"
                    exact={true}
                    component={SignUp}
                />
                <Route
                    path="/users"
                    exact={true}
                    component={UsersList}
                />
                <Route exact path='/' component={HomePage} />
                {/* <Route exact path='/questions' component={QuestionsPage} />
                <Route exact path='/tags' component={TagsPage} />
                <Route exact path='/questions/:id' component={Post} />
                <Route exact path='/tags/:tagname' component={TagPage} />
                <Route exact path='/add/question' component={PostForm} /> */}
            </Switch>
        </>
    );
}

export default App;
