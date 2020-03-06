import db from "../../database/db";
import axios from 'axios';

export const handleSearch = (word) => (
    {
      type: actions.HANDLE_SEARCH,
      payload: axios.get(`${db.url}/search/?word=${word}`)
    }
  );

export const clearSearch = () => (
    {
        type: actions.CLEAR_SEARCH
    }
)

export const actions = {
    HANDLE_SEARCH: 'handleSearch',
    CLEAR_SEARCH: 'CLEAR_SEARCH'
}