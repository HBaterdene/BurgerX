import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";
const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const changePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const signup = () => {
    if (password1 === password2) {
      props.signupUser(email, password1);
    } else {
      setError("Нууц үгс хоорондоо таарахгүй байна!!!!");
    }
  };

 
  return (
    <div className={css.SignupPage}>
      {props.userId && <Redirect to="/" />}
      <h1>Бүртгэлийн форум</h1>
      <div>Та өөрийн мэдээллээ оруулана уу</div>
      <input
        onChange={changeEmail}
        name="email"
        type="text"
        placeholder="Имайл хаяг"
      />
      <input
        onChange={changePassword1}
        name="password"
        type="password"
        placeholder="Нууц үгээ оруулана уу"
      />
      <input
        onChange={changePassword2}
        name="password"
        type="password"
        placeholder="Нууц үгээ давтан оруулана уу"
      />
      {props.saving && <Spinner />}
      {props.firebaseError && <div>{props.firebaseError}</div>}
      {props.firebaseError && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          {props.firebaseError}
        </div>
      )}
      <Button
        text={"Бүртгүүлэх".toUpperCase()}
        ButtonType="Success"
        daragdsan={signup}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    saving: state.signupLoginReducer.saving,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
