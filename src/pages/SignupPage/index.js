import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";
const SignupPage = (props) => {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  // const changeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const changePassword1 = (e) => {
  //   setPassword1(e.target.value);
  // };
  // const changePassword2 = (e) => {
  //   setPassword2(e.target.value);
  // };
  const signup = () => {
    if (password1 === password2) {
      ctx.signupUser(email, password1);
    } else {
      setError("Нууц үгс хоорондоо таарахгүй байна!!!!");
    }
  };

  return (
    <div className={css.SignupPage}>
      {ctx.state.userId && <Redirect to="/" />}
      <h1>Бүртгэлийн форум</h1>
      <div>Та өөрийн мэдээллээ оруулана уу</div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="text"
        placeholder="Имайл хаяг"
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        name="password"
        type="password"
        placeholder="Нууц үгээ оруулана уу"
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        name="password"
        type="password"
        placeholder="Нууц үгээ давтан оруулана уу"
      />
      {ctx.state.saving && <Spinner />}
      {ctx.state.error && <div>{ctx.state.error}</div>}
      {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
      <Button
        text={"Бүртгүүлэх".toUpperCase()}
        ButtonType="Success"
        daragdsan={signup}
      />
    </div>
  );
};

export default SignupPage;
