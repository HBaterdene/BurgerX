import axios from "../../axios-orders";

export const loadOrders = () => {
  return function (dispatch, getState) {
    //захиалгыг татаж эхэллээ гэдгийг мэдэгдэнэ.
    //энийг хүлээж аваад spinner ажиллаж эхэлнэ.
    dispatch(loadOrdersStart());
    const token = getState().signupLoginReducer.token;
    const userId = getState().signupLoginReducer.userId;
    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(loadedOrders));
      })
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};
export const clearOrder = () => {
  return {
    type: "CLEAR_ORDER",
  };
};
export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};
export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

//захиалгыг хадгалах

export const saveOrderStart = (newOrder) => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = (newOrder) => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};
export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};
