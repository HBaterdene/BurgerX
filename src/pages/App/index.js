import React, { useState, useEffect, Suspense, useContext } from "react";
import css from "./style.module.css";
import Toolbar from "../../components/toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "../../components/Logout";
import LoginPage from "../LoginPage";
import Spinner from "../../components/General/Spinner";
import { BurgerStore } from "../../context/Burgercontext";
import { OrderStore } from "../../context/OrderContext";
import UserContext from "../../context/UserContext";
const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});
const ShippingPage = React.lazy(() => {
  return import("../ShippingPage");
});
const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});

const App = (props) => {
  const userCtx = useContext(UserContext);
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        //hugatsaa ni duusaagvi token baina, automate login hiine
        userCtx.userLoginSuccess(token, userId, expireDate, refreshToken);

        //Token huchingui bolohod vldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa automate-aar logout hiine
        userCtx.autoRenewTokenAfterMillsec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        //Token hugatsaa duussan bainaa, logout hiine
        userCtx.autoRenewTokenAfterMillsec(3600000);
      }
    }
  }, []);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
  };

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />
      <SideBar toggleSideBar={toggleSideBar} showSideBar={showSideBar} />
      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<Spinner />}>
            {userCtx.state.userId ? (
              <Switch>
                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>
                <Route path="/logout" component={Logout} />
                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     autoLogin: (token, userId) =>
//       dispatch(actions.loginUserSuccess(token, userId)),
//     logout: () => dispatch(signupActions.logout()),
//     autoLogoutAfterMillsec: (ms) =>
//       dispatch(signupActions.autoLogoutAfterMillsec(ms)),
//   };
// };

export default App;
