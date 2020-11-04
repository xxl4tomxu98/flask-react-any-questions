import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authentication from './authentication';
import posts from './posts';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

//reducer - authentication
const reducer = combineReducers({
    authentication,
    posts,
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
