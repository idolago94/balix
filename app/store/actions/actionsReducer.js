import { actions } from './actionsActions';

const INITIAL_STATE = {
  actions: [],
  fetching: false,
  fetched: false,
  error: undefined
};

export default actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${actions.GET_ACTIONS}_PENDING`: 
      return {
        ...state,
        fetching: true
      }
    case `${actions.GET_ACTIONS}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        actions: action.payload.data
      }
    case `${actions.GET_ACTIONS}_REJECTED`:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
};

