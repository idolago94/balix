import db from '../../database/db';
import axios from 'axios';

export const getActions = (user_id) => {
    return {
      type: actions.GET_ACTIONS,
      payload: axios.get(`${db.url}/actions/getActions?id=${user_id}`)
    }
};

export const actions = {
    GET_ACTIONS: 'GET_ACTIONS'
}