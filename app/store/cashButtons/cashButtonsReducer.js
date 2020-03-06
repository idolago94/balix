import { actions } from './cashButtonsActions';

const INITIAL_STATE = {
  showButtons: false
};

export default cashButtonsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.TOGGLE_BUTTONS:
      return {
        ...state,
        showButtons: !state.showButtons
      }
    default:
      return state
  }
};

