import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import BurgerContext from "../../context/Burgercontext";
const ShippingPage = (props) => {
  const burgerContext = useContext(BurgerContext);
  const goBack = () => {
    props.history.goBack();
  };
  const showContactData = () => {
    props.history.replace("/ship/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p>
        <strong>Таны захиалга амттай байна гэж найдаж байна...</strong>
      </p>
      <p>
        <strong>Дүн: {burgerContext.burger.totalPrice}₮</strong>
      </p>
      <Burger />
      <Button daragdsan={goBack} ButtonType="Danger" text="ЗАХИАЛГЫГ ЦУЦЛАХ" />
      <Button
        daragdsan={showContactData}
        ButtonType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛЭЭ ОРУУЛАХ"
      />
      <Route path="/ship/contact">
        <ContactData />
      </Route>
    </div>
  );
};

export default ShippingPage;
