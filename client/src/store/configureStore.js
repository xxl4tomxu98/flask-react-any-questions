import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authentication from './authentication';
import posts from './posts';
import tags from './tags';
import users from './users';
import answers from './answers';
import comments from './comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

//reducer - authentication
const reducer = combineReducers({
    authentication,
    posts,
    tags,
    users,
    answers,
    comments,
});

//store
const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        storeEnhancer
    );
};

const storeEnhancer = composeEnhancers(applyMiddleware(thunk, logger));

export default configureStore;
