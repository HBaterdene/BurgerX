import React from 'react'
import css from "./style.module.css"
const Order = (props) => {
  return <div className={css.Order}>
      <p>Үйлчлүүлэгчийн нэр: {props.order.hayag.name}</p>
      <p>Орц: Гахайн Мах:{props.order.orts.bacon}, Салад:{props.order.orts.salad}, Үхрийн Мах:{props.order.orts.meat}, Бяслаг:{props.order.orts.cheese}</p>
      <p>Хаяг: {props.order.hayag.city} хот, {props.order.hayag.street}</p>
      <p>Үнийн дүн: <strong>{props.order.dun}₮</strong></p>
  </div>}

export default Order;