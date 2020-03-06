import db from '../../database/db';
import axios from 'axios';

export const login = (user) => (
    {
      type: actions.LOGIN,
      payload: axios.post(`${db.url}/users/login`, JSON.stringify(user), { headers: {'Content-Type': 'application/json', 'Content-Length': '*'} })
    }
);

export const updateUserLogin = (updateUser) => (
    {
        type: actions.UPDATE_USER,
        updateUser: updateUser
    }
)


export const logout = () => (
    {
        type: actions.LOGOUT
    }
);

export const createdUser = newUser => (
    {
        type: actions.CREATED_USER,
        newUser: newUser
    }
)

export const actions = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    UPDATE_USER: 'updateUserLogin',
    CREATED_USER: 'createdUser'
}
