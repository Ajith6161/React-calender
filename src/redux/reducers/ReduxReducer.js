import * as types from "../action/ActionType";
const INITIAL_STATE = { login: null };
export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.log(state);
      return {
        ...state,

        login: true,
      };
    case types.LOGIN_ERROR:
      console.log(state);
      return {
        ...state,

        login: "error",
      };
    case types.LOGIN_NOT_FOUND:
      console.log(state);
      return {
        ...state,

        login: false,
      };
    default:
      return state;
  }
};
export default loginReducer;
