import { removeUser } from './authentication';
const GET_COMMENTS = 'GET_COMMENTS';
const COMMENT_ERROR = 'COMMENT_ERROR';
const DELETE_COMMENT = 'DELETE_COMMENT';


const loadComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments,
    }
}

const formErrors = (errors) => {
    return {
      type: COMMENT_ERROR,
      errors
    };
};

const removeComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId,
    }
}



export const getComments = id => async dispatch => {
    const res = await fetch(`/api/posts/${id}/comments`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments));
        return comments;
    } else if (res.status === 401) {
        return dispatch(removeUser());
    }
    throw res;
};


// Add COMMENT
export const addComment = (postId, formData) => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      dispatch(getComments(postId));
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

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'delete'
    });
    if (res.ok) {
        dispatch(removeComment(commentId));
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
  error: [],
};

export default function(state = initialState, action) {
    switch (action.type){
        case GET_COMMENTS:
            return{...state, ...action.comments};
        case DELETE_COMMENT:
            const nextState = { ...state };
            nextState.list = nextState.list.filter(comm => comm.id !== action.commentId);
            return nextState;
        case COMMENT_ERROR:
            return {
                ...state,
                error: action.errors,
            };
        default:
            return state;
    }
}
