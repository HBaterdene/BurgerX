import React, { Fragment } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import MenuItem from "../MenuItem";
const Menu = (props) => (
  <ul className={css.Menu}>
    {props.userId ? (
      <Fragment>
        <MenuItem link="/logout"> ГАРАХ </MenuItem>
        <MenuItem exact link="/">
          ШИНЭ ЗАХИАЛГА
        </MenuItem>
        <MenuItem link="/orders">ЗАХИАЛГАНУУД</MenuItem>
      </Fragment>
    ) : (
      <Fragment>
        <MenuItem link="/login">НЭВТРЭХ</MenuItem>
        <MenuItem link="/signup">{"Бүртгүүлэх".toUpperCase()}</MenuItem>
      </Fragment>
    )}
  </ul>
);

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};
export default connect(mapStateToProps)(Menu);
