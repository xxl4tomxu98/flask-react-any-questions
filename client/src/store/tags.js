import { removeUser } from './authentication';
const GET_TAGS = 'GET_TAGS';
const GET_TAG = 'GET_TAG';
const LOAD_POST_TO_TAG = 'LOAD_POST_TO_TAG'
const FORM_ERRORS = "FORM_ERRORS";

const loadTags = tags => {
  return {
    type: GET_TAGS,
    tags
  }
}

const loadTag = tag => {
  return {
    type: GET_TAG,
    tag,
  }
}

const loadPostToTag = (post) => {
  return {
    type: LOAD_POST_TO_TAG,
    post
  }
}

const formErrors = (errors) => {
  return {
    type: FORM_ERRORS,
    errors
  };
};


export const getTags = () => async dispatch => {
    const res = await fetch('/api/tags');
    if(res.ok){
      const tags = await res.json();
      return dispatch(loadTags(tags));
    } else if (res.status === 401) {
      return dispatch(removeUser());
    }
    throw res;
};

export const getTag = tagname => async dispatch => {
    const res = await fetch(`/api/tags/${tagname}`);
    if (res.ok) {
        const tag = await res.json()
        dispatch(loadTag(tag));
        return tag;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};


export const tagPost = (tagId, postId) => async dispatch => {
  const res = await fetch(`/api/tags/${tagId}/posts/${postId}`);
  if (res.ok) {
      const post = await res.json();
      dispatch(loadPostToTag(post));
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
    detail: {},
    tagPosts: [],
    error: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return{ ...state, ...action.tags };
        case GET_TAG:
            return { ...state, ...action.tag };
        case LOAD_POST_TO_TAG:
            return { ...state, ...action.post};
        default:
            return state;
    }
}
