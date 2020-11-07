import { removeUser } from './authentication';
const GET_ANSWERS = 'GET_ANSWERS';
const ANSWER_ERROR = 'ANSWER_ERROR';
const DELETE_ANSWER = 'DELETE_ANSWER';

const loadAnswers = (answers) => {
    return {
        type: GET_ANSWERS,
        answers,
    }
}

const formErrors = (errors) => {
  return {
    type: ANSWER_ERROR,
    errors
  };
};

const removeAnswer = (answerId) => {
  return {
      type: DELETE_ANSWER,
      answerId,
  }
}



export const getAnswers = id => async dispatch => {
    const res = await fetch(`/api/posts/${id}/answers`);
    if (res.ok) {
      const answers = await res.json();
      dispatch(loadAnswers(answers));
      return answers;
    } else if (res.status === 401) {
      return dispatch(removeUser());
    }
    throw res;
};

// Add Answer
export const addAnswer = (postId, formData) => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/posts/${postId}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      dispatch(getAnswers(postId));
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

// Delete Answer
export const deleteAnswer = (postId, answerId) => async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF(`/api/posts/${postId}/answers/${answerId}`, {
        method: 'delete'
    });
    if (res.ok) {
        dispatch(removeAnswer(answerId));
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
      case GET_ANSWERS:
          return{...state, ...action.answers};
      case DELETE_ANSWER:
          return {...state,
            ...state.answers.filter(ans => ans.id !== action.answerId),
          };
      case ANSWER_ERROR:
          return {
              ...state,
              error: action.errors,
          };
      default:
          return state;
  }
}
