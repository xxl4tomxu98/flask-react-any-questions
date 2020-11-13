const SET_USER = 'ANYQUESTIONS/USER/SET_USER'
const SET_USERS = 'ANYQUESTIONS/USER/SET_USERS'
const SET_FOLLOWERS = 'ANYQUESTIONS/USER/SET_FOLLOWER'
const SET_FOLLOWINGS = 'ANYQUESTIONS/USER/SET_FOLLOWING'
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

export const loadFollowers = (followers) => {
  return {
      type: SET_FOLLOWERS,
      followers,
  }
}

export const loadFollowings = (followings) => {
  return {
      type: SET_FOLLOWINGS,
      followings,
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


export const getFollowers = id => {
    return async (dispatch) => {
        const res = await fetch(`/api/users/${id}/followers`);
        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(error(errors))
            return errors
        }
        if (res.ok) {
            const followers= await res.json();
            dispatch(loadFollowers(followers));
            return followers;
        }
        throw res;
    }
}

export const getFollowings = id => {
  return async (dispatch) => {
      const res = await fetch(`/api/users/${id}/following`);
      if (res.status === 400) {
          const { errors } = await res.json();
          dispatch(error(errors))
          return errors
      }
      if (res.ok) {
          const followings= await res.json();
          dispatch(loadFollowings(followings));
          return followings;
      }
      throw res;
  }
}

const initialState = {
    list: [],
    detail: {},
    followers: [],
    followings: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user }
        case SET_USERS:
            return { ...state, ...action.users }
        case SET_FOLLOWERS:
            return { ...state, ...action.followers }
        case SET_FOLLOWINGS:
          return { ...state, ...action.followings }
        case ERROR_MSG:
            return { ...state, error: action.message }
        default:
            return state
    }
}
