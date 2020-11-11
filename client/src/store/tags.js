import { removeUser } from './authentication';
const GET_TAGS = 'GET_TAGS';
const GET_TAG = 'GET_TAG';

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

const initialState = {
    list: [],
    detail: {},
    error: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return{ ...state, ...action.tags };
        case GET_TAG:
            return { ...state, ...action.tag };
        default:
            return state;
    }
}
