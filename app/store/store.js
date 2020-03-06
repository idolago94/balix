import menuReducer from './sideMenu/menuReducer';
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import searchReducer from './search/searchReducer';
import cashButtonsReducer from './cashButtons/cashButtonsReducer';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import actionsReducer from './actions/actionsReducer';
import usersReducer from './users/usersReducer';

const reducers = combineReducers({
    auth: authReducer,
    sideMenu: menuReducer,
    search: searchReducer,
    cashButtons: cashButtonsReducer,
    actions: actionsReducer,
    users: usersReducer,
});

const middlewares = applyMiddleware(promise, thunk)

export default createStore(reducers, middlewares);