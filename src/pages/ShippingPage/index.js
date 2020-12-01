import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

const ShippingPage = (props) => {
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
        <strong>Дүн: {props.price}₮</strong>
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

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};
export default connect(mapStateToProps)(ShippingPage);
