import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";
class SignupPage extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: "",
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePassword1 = (e) => {
    this.setState({ password1: e.target.value });
  };
  changePassword2 = (e) => {
    this.setState({ password2: e.target.value });
  };
  signup = () => {
    if (this.state.password1 === this.state.password2) {
      this.props.signupUser(this.state.email, this.state.password1);
    } else {
      this.setState({ error: "Нууц үгс хоорондоо таарахгүй байна!!!!" });
    }
  };

  render() {
    console.log(this.props.userId);
    return (
      <div className={css.SignupPage}>
        {this.props.userId && <Redirect to="/" />}
        <h1>Бүртгэлийн форум</h1>
        <div>Та өөрийн мэдээллээ оруулана уу</div>
        <input
          onChange={this.changeEmail}
          name="email"
          type="text"
          placeholder="Имайл хаяг"
        />
        <input
          onChange={this.changePassword1}
          name="password"
          type="password"
          placeholder="Нууц үгээ оруулана уу"
        />
        <input
          onChange={this.changePassword2}
          name="password"
          type="password"
          placeholder="Нууц үгээ давтан оруулана уу"
        />
        {this.props.saving && <Spinner />}
        {this.props.firebaseError && <div>{this.props.firebaseError}</div>}
        {this.props.firebaseError && (
          <div style={{ color: "red", fontWeight: "bold" }}>
            {this.props.firebaseError}
          </div>
        )}
        <Button
          text={"Бүртгүүлэх".toUpperCase()}
          ButtonType="Success"
          daragdsan={this.signup}
        />
      </div>
    );
  }
}
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
