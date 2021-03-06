import dd1299Reducer, {
  createSubmitFailure,
  createSubmitSuccess,
  createSubmitReset,
} from './ducks';
import { getUiSchema } from './uiSchema';

const uiSchema = getUiSchema();
describe('Reducer', () => {
  it('Should handle SUBMIT_SUCCESS', () => {
    const err = 'OH NO';
    const expectedState = {
      uiSchema,
      hasSchemaError: false,
      hasSubmitError: false,
      hasSubmitSuccess: true,
    };
    const newState = dd1299Reducer(undefined, createSubmitSuccess(err));
    expect(newState).toEqual(expectedState);
  });
  it('Should handle SUBMIT_FAILURE', () => {
    const err = 'OH NO';
    const expectedState = {
      uiSchema,
      hasSchemaError: false,
      hasSubmitError: true,
      hasSubmitSuccess: false,
    };
    const newState = dd1299Reducer(undefined, createSubmitFailure(err));
    expect(newState).toEqual(expectedState);
  });
  it('Should handle SUBMIT_RESET', () => {
    const err = 'OH NO';
    const expectedState = {
      uiSchema,
      hasSchemaError: false,
      hasSubmitError: false,
      hasSubmitSuccess: false,
    };
    const newState = dd1299Reducer(undefined, createSubmitReset());
    expect(newState).toEqual(expectedState);
  });
});

// TODO: Figure out how to mock the Swagger API call
// describe('async action creators', () => {
//   const middlewares = [ thunk ]
//   const initialState = { issues: null, hasSchemaError: false };
//   const mockStore = configureStore(middlewares)

//   afterEach(() => {
//     fetchMock.reset()
//     fetchMock.restore()
//   })

//   it('creates SHOW_ISSUES_SUCCESS when submitted issues have been loaded', () => {
//     fetchMock
//       .getOnce('/submitted', { items: { issues: [{'id': 11, 'description': 'too few dogs'}] }, headers: { 'content-type': 'application/json' } })

//     const expectedActions = [
//       { type: SHOW_ISSUES },
//       { type: SHOW_ISSUES_SUCCESS, items: { issues: [{'id': 11, 'description':'too few dogs'}] } }
//     ]

//     const store = mockStore(initialState)

//     return store.dispatch(loadIssues()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })
