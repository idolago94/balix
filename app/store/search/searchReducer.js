import userService from '../../demoDB/Users/userService';
import { actions } from './searchActions';

const INITIAL_STATE = {
  searchResult: [],
  fetching: false,
  fetched: false,
  error: undefined
};

export default searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${actions.HANDLE_SEARCH}_PENDING`:
      return {
        ...state,
        fetching: true
      }
    case `${actions.HANDLE_SEARCH}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        searchResult: action.payload.data
      }
    case `${actions.HANDLE_SEARCH}_REJECTED`:
      console.log(action)
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case actions.CLEAR_SEARCH:
      return {
        ...state,
        searchResult: []
      }

    // case actions.HANDLE_SEARCH:
    //   let searchResult = [];
    //   if(action.searchWord != '') {
    //     searchResult = allUsers.filter((user) =>
    //       user.userName.toLowerCase().includes(action.searchWord.toLowerCase()) ||
    //       (user.keywords.join()).toLowerCase().includes(action.searchWord.toLowerCase())
    //     )
    //   }
    //   return {
    //     ...state,
    //     wordSearch: action.searchWord,
    //     searchResult: searchResult
    //   }
    default:
      return state
  }
};

