import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
} from '../types';

const initialState = {
  userData: {},
};

const AccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        userData: {...action.payload},
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state,
        userData: null
      }
    }
    default: {
      return state;
    }
  }
};

export default AccountsReducer;