const SET_USER = 'ANYQUESTIONS/USER/SET_USER'
const SET_USERS = 'ANYQUESTIONS/USER/SET_USERS'
const ERROR_MSG = 'ANYQUESTIONS/USER/ERROR_MSG'

export const loadUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const loadUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const error = (message) => {
  return { type: ERROR_MSG, message };
}






export const getUsers = () => {
    return async (dispatch) => {
        const res = await fetch('/api/users')
        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(error(errors))
            return errors
        }
        if (res.ok) {
            const users= await res.json();
            dispatch(loadUsers(users));
            return users;
        }
        throw res;
    }
}


export const getUser = id => async dispatch => {
    const res = await fetch(`/api/users/${id}`);
    if (res.status === 400) {
        const { errors } = await res.json();
        dispatch(error(errors))
        return errors
    }
    if (res.ok) {
        const user = await res.json()
        dispatch(loadUser(user));
        return user;
    }
    throw res;
};


const initialState = {
    list: [],
    detail: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user }
        case SET_USERS:
            return { ...state, ...action.users }
        case ERROR_MSG:
            return { ...state, error: action.message }
        default:
            return state
    }
}
