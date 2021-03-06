import { CreateForm1299 } from './api';
import { getUiSchema } from './uiSchema';

// Types
export const REQUEST_SUBMIT = 'REQUEST_SUBMIT';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';
export const SUBMIT_RESET = 'SUBMIT_RESET';

// Actions

export const createRequestSubmit = () => ({
  type: REQUEST_SUBMIT,
});

//submitting form
export const createSubmitSuccess = responseData => ({
  type: SUBMIT_SUCCESS,
  responseData,
});

export const createSubmitFailure = error => ({
  type: SUBMIT_FAILURE,
  error,
});

export const createSubmitReset = () => ({
  type: SUBMIT_RESET,
});

export function submitForm(formData) {
  return function(dispatch, getState) {
    if (!formData) {
      // HACK: since we are using redux-thunk, have access to other state
      formData = getState().form.DD1299.values;
    }
    dispatch(createRequestSubmit());
    CreateForm1299(formData)
      .then(result => dispatch(createSubmitSuccess(result)))
      .catch(error => dispatch(createSubmitFailure(error)));
  };
}

export function resetSuccess() {
  return createSubmitReset();
}
// Reducer
const initialState = {
  uiSchema: getUiSchema(),
  hasSchemaError: false,
  hasSubmitError: false,
  hasSubmitSuccess: false,
};
function dd1299Reducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        hasSubmitSuccess: true,
        hasSubmitError: false,
      });
    case SUBMIT_FAILURE:
      return Object.assign({}, state, {
        hasSubmitSuccess: false,
        hasSubmitError: true,
      });
    case SUBMIT_RESET:
      return Object.assign({}, state, {
        hasSubmitError: false,
        hasSubmitSuccess: false,
      });
    default:
      return state;
  }
}

export default dd1299Reducer;
