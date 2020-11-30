import React, { Component } from "react";

import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/OrderActions";
class OrderPage extends Component {
  //     State = {
  //         orders: [],
  //         loading:false,
  //   }

  componentDidMount = () => {
    //     this.setState({loading: true})
    //
    this.props.loadOrders(this.props.userId);
  };
  // console.log({this.state.orders});
  render() {
    // console.log("=========", this.state.orders);
    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((el) => <Order key={el[0]} order={el[1]} />)
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
// export default OrderPage
