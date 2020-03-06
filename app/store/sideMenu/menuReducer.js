import { actions } from './menuActions';

const INITIAL_STATE = {
  openMenu: false
};

export default menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.TOGGLEMENU:
      return {
        ...state,
        openMenu: !state.openMenu
      }
    default:
      return state
  }
};

