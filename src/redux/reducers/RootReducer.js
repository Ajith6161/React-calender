import { combineReducers } from 'redux';
import {loginReducer} from "./ReduxReducer";

export default combineReducers({
  data: loginReducer
});
