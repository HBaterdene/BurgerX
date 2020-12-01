import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import css from "./style.module.css";
import { withRouter } from "react-router-dom";
import Spinner from "../General/Spinner";
import * as actions from "../../redux/actions/OrderActions";

const ContactData = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  useEffect(() => {
    if (props.newOrderStatus.finished && !props.newOrderStatus.error) {
      props.history.replace("/orders");
    }

    return () => {
      //цэвэрлэгч функц: Захиалгыг буцаагаад хоосолно. Дараачийн захиалгад бэлтгэнэ.
      {
        props.newOrderStatus.finished && props.clearOrder();
      }
    };
  }, [props.newOrderStatus.finished]);
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeStreet = (e) => {
    setStreet(e.target.value);
  };
  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const saveOrder = () => {
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name,
        city,
        street,
      },
    };
    props.saveOrderAction(newOrder);
  };

  return (
    <div className={css.ContactData}>
      <div>
        {props.newOrderStatus.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${props.newOrderStatus.error}`}
      </div>
      {props.newOrderStatus.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны оршин суугаа хот"
          />
          <Button text="ИЛГЭЭХ" ButtonType="Success" daragdsan={saveOrder} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
    clearOrder: () => dispatch(actions.clearOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
