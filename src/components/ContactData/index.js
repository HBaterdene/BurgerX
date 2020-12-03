import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "../General/Button";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import Spinner from "../General/Spinner";
import BurgerContext from "../../context/Burgercontext";
import UserContext from "../../context/UserContext";

const ContactData = (props) => {
  const history = useHistory();
  const burgerContext = useContext(BurgerContext);
  const userContext = useContext(UserContext);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const dunRef = useRef();

  useEffect(() => {
    if (burgerContext.burger.finished && !burgerContext.burger.error) {
      history.replace("/orders");
    }

    return () => {
      //цэвэрлэгч функц: Захиалгыг буцаагаад хоосолно. Дараачийн захиалгад бэлтгэнэ.
      {
        burgerContext.burger.finished && burgerContext.clearBurger();
      }
    };
  }, [burgerContext.burger.finished]);
  const changeName = (e) => {
    if (dunRef.current.style.color === "red")
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red";
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
      userId: userContext.state.userId,
      orts: burgerContext.burger.ingredients,
      dun: burgerContext.burger.totalPrice,
      hayag: {
        name,
        city,
        street,
      },
    };
    burgerContext.saveBurger(newOrder, userContext.state.token);
  };

  return (
    <div className={css.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: "16px" }}>
          Дүн: {burgerContext.burger.totalPrice}₮
        </strong>
      </div>
      <div>
        {burgerContext.burger.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${burgerContext.burger.error}`}
      </div>
      {burgerContext.burger.saving ? (
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

export default ContactData;
