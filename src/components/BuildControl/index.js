import React, { useContext } from "react";
import css from "./style.module.css";
import BurgerContext from "../../context/Burgercontext";
const BuildControl = (props) => {
  const burgerContext = useContext(BurgerContext);
  return (
    <div className={css.BuildControl}>
      <div className={css.Label}>{props.orts}</div>
      <button
        onClick={() => burgerContext.removeIngredient(props.type)}
        disabled={props.disabledIngredients[props.type]}
        className={css.Less}
      >
        хасах
      </button>
      <button
        onClick={() => burgerContext.addIngredient(props.type)}
        className={css.More}
      >
        нэмэх
      </button>
    </div>
  );
};

export default BuildControl;
