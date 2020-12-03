import React, { useContext } from "react";
import css from "./style.module.css";
import MenuItem from "../MenuItem";
import UserContext from "../../context/UserContext";
const Menu = () => {
  const ctx = useContext(UserContext);

  return (
    <ul className={css.Menu}>
      {ctx.state.userId ? (
        <>
          <MenuItem link="/logout"> ГАРАХ </MenuItem>
          <MenuItem exact link="/">
            ШИНЭ ЗАХИАЛГА
          </MenuItem>
          <MenuItem link="/orders">ЗАХИАЛГАНУУД</MenuItem>
        </>
      ) : (
        <>
          <MenuItem link="/login">НЭВТРЭХ</MenuItem>
          <MenuItem link="/signup">{"Бүртгүүлэх".toUpperCase()}</MenuItem>
        </>
      )}
    </ul>
  );
};

export default Menu;
