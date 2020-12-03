import React, { useContext } from "react";
import BurgerContext from "../../context/Burgercontext";
import Button from "../General/Button";
const OrderSummary = (props) => {
  const burgerContext = useContext(BurgerContext);
  const list = burgerContext.burger.ingredientNames;
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд:</p>
      <ul>
        {Object.keys(list).map((el) => (
          <li key={el}>
            {burgerContext.burger.ingredientNames[el]}:{" "}
            {burgerContext.burger.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        Захиалгын дүн: <strong>{burgerContext.burger.totalPrice}₮</strong>
      </p>
      <p>Цаашаа үргэлжлүүлэх үү?</p>
      <Button
        key={props.onCancel}
        text="Татгалзах"
        ButtonType="Danger"
        daragdsan={props.onCancel}
      />
      <Button
        key={props.onContinue}
        text="Үргэлжлүүлэх"
        ButtonType="Success"
        daragdsan={props.onContinue}
      />
    </div>
  );
};

export default OrderSummary;
