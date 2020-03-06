import { actions } from './usersActions';

const INITIAL_STATE = {
  users: [],
  images: [],
  fetching: false,
  fetched: false,
  error: undefined
};

export default usersReducer = (state = INITIAL_STATE, action) => {
  console.log('redux action type: ', action.type);
  switch (action.type) {
    case `${actions.GET_USERS}_PENDING`: 
      return {
        ...state,
        fetching: true
      }
    case `${actions.GET_USERS}_FULFILLED`:
      // let usersImages = {...state.auth.userLogin.uploads};
      // action.payload.data.map((user) => {
      //   let userUploads = user.uploads.forEach(up => up.user_id = user._id);
      //   usersImages = usersImages.concat(userUploads);
      // });
      // usersImages.sort((a, b) => b.uploadDate - a.uploadDate);
      console.log('users reducer fulfilled');
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload.data,
        // images: usersImages
      }
    case `${actions.GET_USERS}_REJECTED`:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case actions.UPDATE_USERS:
      return {
        ...state,
        users: action.updateUsers
      }
    default:
      return state
  }
};

