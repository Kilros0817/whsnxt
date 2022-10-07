import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import { CartReducer } from './cartReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  cart: CartReducer,
});

export default reducer;
