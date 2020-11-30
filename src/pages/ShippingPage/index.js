import React, { Component } from "react"
import { connect } from "react-redux";
import {Route} from "react-router-dom"
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css"

 class ShippingPage extends Component{
   
  
     goBack = () => {
         this.props.history.goBack()
     }
     showContactData = () => {
         this.props.history.replace("/ship/contact")
     }
   
 
    render(){
        return <div className={css.ShippingPage}>
            <p><strong>Таны захиалга амттай байна гэж найдаж байна...</strong>
            </p>
    <p><strong>Дүн: {this.props.price}₮</strong>
            </p>
            <Burger/>
            <Button daragdsan={this.goBack} ButtonType="Danger" text="ЗАХИАЛГЫГ ЦУЦЛАХ"/>
            <Button daragdsan={this.showContactData} ButtonType="Success" text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛЭЭ ОРУУЛАХ"/>
            <Route path="/ship/contact"><ContactData/></Route>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerReducer.totalPrice
    }
}
export default connect(mapStateToProps)(ShippingPage)