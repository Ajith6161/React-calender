import React, { useEffect, useState } from "react";
import "../styles.css";
import "../App.css";
import logo from "../Assets/resizedlogo.png";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Calendar from "../Pages/calendarPage";
import { useDispatch, useSelector } from "react-redux";
import fetchLoginData from "../redux/action/Action";

function LoginPage(props) {
  const [employeeID, setemployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [employeeIDError, setemployeeIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [validateemployeeID, setValidateemployeeID] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const isAdmin = useSelector((state) => state.isAdmin);
  const history = useHistory();

  useEffect(() => {
    if (login == true) {
      
      history.push("/tableView");
      
    }
    if(login == false){
      setLoginError('Employee Not Found')
    }
  }, [login]);

  const employeeIDValidation = (e) => {
    setemployeeID(e.target.value);
    if (new RegExp("^[0-9]*$").test(e.target.value)) {
      setemployeeIDError("");
      setValidateemployeeID(true);
    } else {
      setemployeeIDError("Please Enter a Valid employeeID Id");
    }
  };

  const passwordValidation = (e) => {
    setPassword(e.target.value);
    if (new RegExp("^[0-9]{8,}$").test(e.target.value)) {
      setPasswordError("Password is Strong");
      setValidatePassword(true);
    } else {
      setPasswordError("Password should be strong");
    }
  };

  const submitHandler = () => {
    dispatch(fetchLoginData({ employeeID, password }));
  };

  return (
    <section className="gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} alt="logo" />

                      <h4 className="mt-100 mb-4 pb-1">
                        We are The Panelist Team
                      </h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          id="form2Example11"
                          value={employeeID}
                          className="form-control"
                          placeholder="Employee ID"
                          onChange={employeeIDValidation}
                        />
                        <div
                          className="mt-2"
                          style={{ color: "red", fontSize: "10px" }}
                        >
                          {employeeIDError}
                        </div>
                      </div>

                      <div className="form-outline ">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="password"
                          value={password}
                          onChange={passwordValidation}
                        />
                        {passwordError == "Password is Strong" ? (
                          <div
                            className="mt-2"
                            style={{ color: "green", fontSize: "10px" }}
                          >
                            {passwordError}
                          </div>
                        ) : (
                          <div
                            className="mt-2"
                            style={{ color: "red", fontSize: "10px" }}
                          >
                            {passwordError}
                          </div>
                        )}
                      </div>
                      <div className="text-center pt-1  pb-1 mt-5">
                        <button
                          className="btn btn-primary"
                          type="button"
                          id="button-submit"
                          disabled={
                            validateemployeeID == false ||
                            validatePassword == false
                          }
                          onClick={submitHandler}
                        >
                          Login
                          {/* <Link  to={ '/calendar'}>Login</Link> */}
                        </button>
                        <div
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {loginError}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LoginPage;
