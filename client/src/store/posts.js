import { removeUser } from './authentication';
const GET_POSTS = 'GET_POSTS';
const GET_POST = 'GET_POST';
const GET_TOP_POSTS = 'GET_TOP_POSTS';
const GET_TAG_POSTS = 'GET_TAG_POSTS';
const POST_ERROR = 'POST_ERROR';
const DELETE_POST = 'DELETE_POST';

const load = posts => {
  return {
    type: GET_POSTS,
    posts
  }
}

const loadPost = post => {
  return {
    type: GET_POST,
    post
  }
}

const loadTopPosts = topPosts => {
  return {
    type: GET_TOP_POSTS,
    topPosts
  }
}

const loadTagPosts = tagPosts => {
  return {
    type: GET_TAG_POSTS,
    tagPosts
  }
}


const removePost = (postId) => {
  return {
      type: DELETE_POST,
      postId
  }
}

const formErrors = (errors) => {
  return {
    type: POST_ERROR,
    errors
  };
};



 // Get posts
export const getPosts = () => async dispatch => {
    const res = await fetch('/api/posts');
    if (res.ok) {
        const posts = await res.json();
        dispatch(load(posts));
        return posts;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};

// Get post
export const getPost = id => async dispatch => {
    const res = await fetch(`/api/posts/${id}`);
    if (res.ok) {
        const post = await res.json()
        dispatch(loadPost(post));
        return post;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};

//GET TOP POSTS
export const getTopPosts = () => async dispatch => {
    const res = await fetch('/api/posts/top');
    if (res.ok) {
        const topPosts = await res.json()
        dispatch(loadTopPosts(topPosts));
        return topPosts;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};

//GET TAG POSTS
export const getTagPosts = tagname => async dispatch => {
    const res = await fetch(`/api/posts/tag/${tagname}`);
    if (res.ok) {
        const tagPosts = await res.json()
        dispatch(loadTagPosts(tagPosts));
        return tagPosts;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};

// Add post
export const addPost = formData => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF('/api/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    if (res.ok) {
        dispatch(getPosts());
        return res;
    } else if (res.status === 401) {
        dispatch(removeUser());
        return res;
    } else if (res.status === 422) {
        const { errors } = await res.json();
        dispatch(formErrors(errors));
        return res;
    }
    throw res;
};

// Delete post
export const deletePost = id => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/posts/${id}`, {
        method: 'delete'
    });
    if (res.ok) {
        dispatch(removePost(id));
        return res;
    } else if (res.status === 401) {
        dispatch(removeUser());
        return res;
    } else if (res.status === 422) {
        const { errors } = await res.json();
        dispatch(formErrors(errors));
        return res;
    }
    throw res;
};


const initialState = {
    list: [],
    tagPosts: [],
    topPosts: [],
    post: null,
    errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
      case GET_POSTS:
          return { ...state, ...action.posts };
      case GET_TOP_POSTS:
          return { ...state, ...action.topPosts };
      case GET_TAG_POSTS:
          return { ...state, ...action.tagPosts };
      case GET_POST:
          return {
              ...state,
              ...action.post,
          };
      case DELETE_POST:
          const nextState = { ...state };
          nextState.list = nextState.list.filter(post => post.id !== action.postId);
          return nextState;
      case POST_ERROR:
          return {
              ...state,
              errors: action.errors,
          };
      default:
          return state;
  }
}
