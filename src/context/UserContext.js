import React, { useState } from "react";
import axios from "../axios-orders";
const UserContext = React.createContext();
const initialState = {
  saving: false,
  logginIn: false,
  firebaseError: null,
  token: null,
  userId: null,
  error: null,
  errorCode: null,
  expireDate: null,
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);
  const autoRenewTokenAfterMillsec = (ms) => {
    axios
      .post(
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyBozzbd77FsqTeO0QkBdmp_roGXNEHo468",
        {
          grant_type: "refresh_token",
          refresh_token: localStorage.getItem("refreshToken"),
        }
      )
      .then((result) => {
        const token = result.data.id_token;
        const userId = result.data.local_id;
        const expiresIn = result.data.expires_in;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refresh_token;
        userLoginSuccess(token, userId, expireDate, refreshToken);
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
        });
      });
    console.log("lolooo");
    //automate logout
    setTimeout(() => {
      autoRenewTokenAfterMillsec(3600000);
    }, ms);
  };
  const userLoginSuccess = (token, userId, expireDate, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("refreshToken", refreshToken);
    setState({
      ...state,
      logginIn: false,
      error: null,
      errorCode: null,
      token,
      userId,
      expireDate,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("refreshToken");
    setState(initialState);
  };

  const signupUser = (email, password) => {
    setState({ ...state, saving: true });
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBozzbd77FsqTeO0QkBdmp_roGXNEHo468",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);
        setState({
          ...state,
          saving: false,
          token,
          userId,
          error: null,
          errorCode: null,
        });
        // dispatch(autoLogoutAfterMillsec(expiresIn * 1000));
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
        });
      });
  };
  const loginUser = (email, password) => {
    setState({ ...state, logginIn: true });
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBozzbd77FsqTeO0QkBdmp_roGXNEHo468",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;
        userLoginSuccess(token, userId, expireDate, refreshToken);
      })
      .catch((err) => {
        setState({ ...state, error: err.message, errorCode: err.code });
      });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        logout,
        userLoginSuccess,
        autoRenewTokenAfterMillsec,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
