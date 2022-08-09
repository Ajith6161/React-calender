import * as actionTypes from "./ActionType";
import axios from "axios";

const fetchLoginData = (data) => (dispatch) => {
  console.log("inside");
  axios
    .post(`http://localhost:8085/tel/employee/login`, {
      employee_id: data.employeeID,
      password: data.password,
    })
    .then((res) => {
      if (res.data.message == "Login Successful") {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.LOGIN_NOT_FOUND,
          payload: res.data,
        });
      }
    })
    .catch(() => {
      console.log("catch");
      dispatch({
        type: actionTypes.LOGIN_ERROR,
      });
    });
};
export default fetchLoginData;
