import { removeUser } from './authentication';
const GET_TAGS = 'GET_TAGS';

const loadTags = tags => {
  return {
    type: GET_TAGS,
    tags
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



const initialState = {
  list: [],
  tag: null,
  error: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return{
                ...state,
                ...action.tags,
            };
        default:
            return state;
    }
}
