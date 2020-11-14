import { removeUser } from './authentication';
const SET_USER = 'ANYQUESTIONS/USER/SET_USER'
const SET_USERS = 'ANYQUESTIONS/USER/SET_USERS'
const SET_FOLLOWERS = 'ANYQUESTIONS/USER/SET_FOLLOWER'
const SET_FOLLOWINGS = 'ANYQUESTIONS/USER/SET_FOLLOWING'
const SET_BOOKMARKS = 'ANYQUESTIONS/USER/SET_BOOKMARKS'
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

export const loadBookmarkedPosts = (posts) => {
    return {
        type: SET_BOOKMARKS,
        posts,
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


export const getBookmarkedPosts = id => {
    return async (dispatch) => {
        const res = await fetch(`/api/users/${id}/bookmarks`)
        const posts = await res.json()
        dispatch(loadBookmarkedPosts(posts));
        return posts;
    }
}


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

export const bookmarkPost = (id, postId) => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/users/${id}/bookmarks/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postId)
    });
    if (res.status === 400) {
      const { errors } = await res.json();
      dispatch(error(errors))
      return errors
    }
    if (res.ok) {
        dispatch(getBookmarkedPosts(id));
        return res;
    } else if (res.status === 401) {
        dispatch(removeUser());
        return res;
    }
    throw res;
};


const initialState = {
    list: [],
    detail: {},
    followers: [],
    followings: [],
    bookmarked: [],
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
        case SET_BOOKMARKS:
            return { ...state, ...action.posts }
        case ERROR_MSG:
            return { ...state, error: action.message }
        default:
            return state
    }
}
