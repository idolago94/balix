import db from '../../database/db';
import axios from 'axios';

export const getUsers = (array_user_id) => {
  console.log(array_user_id);
    return {
      type: actions.GET_USERS,
      payload: axios.get(`${db.url}/users/getUsers?ids=${array_user_id.join(',') || ''}`)
    }
  };

export const updateUsers = (updateUsers) => (
    {
      type: actions.UPDATE_USERS,
      updateUsers: updateUsers
    }
);

export const actions = {
    GET_USERS: 'GET_USERS',
    UPDATE_USERS: 'UPDATE_USERS'
}