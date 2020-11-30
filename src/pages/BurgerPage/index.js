import React, { Component } from "react";
import Burger from "../../components/Burger"
import BuildControls from "../../components/BuildControls"
import Modal from "../../components/General/Modal"
import OrderSummary from "../../components/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/General/Spinner"

 class BurgerPage extends Component {
   state = {
       confirmOrder: false
    };

    continueOrder = () => {
        this.props.history.push({
          pathname: "/ship",
        })

        this.closeConfirmModal();

    }
    showConfirmModal = () => {
        this.setState({confirmOrder: true})
    }
    closeConfirmModal = () => {
        this.setState({confirmOrder: false})
    }
    
    
    render(){
       
        return(
            <div>
                <Modal show = {this.state.confirmOrder} closeConfirmModal = {this.closeConfirmModal}>
                {this.state.loading ? (<Spinner/>) : (<OrderSummary 
                      onCancel = {this.closeConfirmModal}
                      onContinue ={this.continueOrder}
                      ingredients={this.props.burgeriinOrts}
                      ingredientNames={this.props.ingredientNames}
                      price={this.props.niitUne}
                    />)}
                    
                </Modal>
                <Burger />
                <BuildControls
                  disabledButton={!this.props.purchasing}
                  showConfirmModal={this.showConfirmModal}
                  closeConfirmModal={this.closeConfirmModal}
                />
            </div>
        )
    }
}

export default BurgerPage;