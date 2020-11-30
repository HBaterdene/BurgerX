import React, { Component } from "react";
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
class App extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = localStorage.getItem("expireDate");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        //hugatsaa ni duusaagvi token baina, automate login hiine
        this.props.autoLogin(token, userId);

        //Token huchingui bolohod vldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa automate-aar logout hiine
        this.props.autoLogoutAfterMillsec(
          (expireDate.getItem() - new Date().getTime()) * 1000
        );
      } else {
        //Token hugatsaa duussan bainaa, logout hiine
        this.props.logout();
      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          toggleSideBar={this.toggleSideBar}
          showSideBar={this.state.showSideBar}
        />
        <main className={css.Content}>
          {this.props.userId}
          {this.props.userId ? (
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
  }
}
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
    autoLogoutafterMillisec: (ms) =>
      dispatch(signupActions.autoLogoutAfterMillsec(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
