import React, { useState } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";
const LoginPage = (props) => {
  const [form, setForm] = useState({ email: {}, password: {} });
  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };
  const changePassword = (e) => {
    const newPassword = e.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };
  const login = () => {
    props.login(form.email, form.password);
  };

  return (
    <div className={css.LoginPage}>
      {props.userId && <Redirect to="/orders" />}
      <input
        onChange={changeEmail}
        name="email"
        type="text"
        placeholder="Имайл хаяг"
      />
      <input
        onChange={changePassword}
        name="password"
        type="password"
        placeholder="Нууц үг"
      />
      {props.logginIn && <Spinner />}
      {props.firebaseError && (
        <div style={{ color: "red" }}>
          {props.firebaseErrorCode === 400 && "Нууц үг буруу байна!!!"}
        </div>
      )}
      <Button text="Логин" ButtonType="Success" daragdsan={login} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    logginIn: state.signupLoginReducer.logginIn,
    firebaseError: state.signupLoginReducer.firebaseError,
    firebaseErrorCode: state.signupLoginReducer.firebaseErrorCode,
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
