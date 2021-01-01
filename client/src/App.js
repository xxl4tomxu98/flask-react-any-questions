import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Switch, Route } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Post from './components/Post';
import PostForm from './components/PostForm';
import HomePage from './components/HomePage/HomePage';
import TagsPage from './components/TagsPage';
import TagPage from './components/TagPage';
import Profile from './components/Profile';
import QuestionsPage from './components/QuestionsPage';
import UsersList from './components/UsersList';
import UserPage from './components/UserPage';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import { setCsrfFunc } from './store/authentication';



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
                <Route
                    path="/users/:userId"
                    exact={true}
                    component={UserPage}
                />
                <Route
                    path="/currentUser"
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
                <Route path="/search"
                    exact={true}
                    component={SearchPage}
                />
                <Route exact path='/' component={HomePage} />
                <Route exact path='/tags' component={TagsPage} />
                <Route exact path='/tags/:tagname' component={TagPage} />
                <Route exact path='/questions' component={QuestionsPage} />

                <Route exact path='/questions/:id' component={Post} />
                <Route exact path='/add/question' component={PostForm} />
            </Switch>
            <Footer/>
        </>
    );
}

export default App;
