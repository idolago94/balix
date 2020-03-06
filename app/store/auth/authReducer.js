import { actions } from './authActions';
import AppNavigator from '../../Routes/AppNavigator';
import Routes from '../../Routes/Routes';

const INITIAL_STATE = {
  userLogin: undefined,
  fetching: false,
  fetched: false,
  error: undefined
};

export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${actions.LOGIN}_PENDING`:
      return {
        ...state,
        fetching: true
      }
    case `${actions.LOGIN}_FULFILLED`:
      console.log(action.payload.data.username || action.payload.data);
      let user = JSON.parse(JSON.stringify(action.payload.data));
      return {
        ...state,
        fetching: false,
        fetched: true,
        userLogin: user
      }
    case `${actions.LOGIN}_REJECTED`:
      console.log(action)
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case actions.LOGOUT:
      return {
        ...state,
        userLogin: undefined,
        fetched: false
      }
    case actions.UPDATE_USER:
      return {
        ...state,
        userLogin: action.updateUser
      }
    case actions.CREATED_USER:
      console.log('user created!!');
      return {
        ...state,
        userLogin: action.newUser
      }
    default:
      return state
  }
};

