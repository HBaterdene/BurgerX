import axios from "axios";
import * as actions from "./signupActions";
export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());
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
        console.log(expiresIn);
        const currentDate = new Date();
        const expireDate = currentDate.getTime() + expiresIn;
        const refreshToken = result.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginUserSuccess(token, userId));
        // actions.autoLogoutAfterMillsec(expiresIn*1000);
        dispatch(actions.autoLogoutAfterMillsec(expiresIn * 1000));
      })
      .catch((error) => {
        dispatch(loginUserError(error));
      });
  };
};
export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
export const loginUserSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};
