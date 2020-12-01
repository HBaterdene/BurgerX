import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Toolbar from "../../components/toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Route, Switch, Redirect } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Logout from "../../components/Logout";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";
const App = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = localStorage.getItem("expireDate");
    const refreshToken = localStorage.getItem("refreshToken");
    const currentDate = new Date();
    if (token) {
      if (expireDate > currentDate.getTime()) {
        //hugatsaa ni duusaagvi token baina, automate login hiine
        props.autoLogin(token, userId);

        //Token huchingui bolohod vldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa automate-aar logout hiine
        props.autoLogoutAfterMillsec(expireDate - currentDate.getTime());
      } else {
        //Token hugatsaa duussan bainaa, logout hiine
        props.logout();
      }
    }
  });

  const toggleSideBar = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
  };

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />
      <SideBar toggleSideBar={toggleSideBar} showSideBar={showSideBar} />
      <main className={css.Content}>
        {props.userId ? (
          <Switch>
            <Route path="/orders" component={OrderPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillsec: (ms) =>
      dispatch(signupActions.autoLogoutAfterMillsec(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
