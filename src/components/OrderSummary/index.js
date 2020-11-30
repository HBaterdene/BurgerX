import React from 'react';
import {connect} from 'react-redux';

import Button from '../General/Button';
const OrderSummary = props => {
    const list = props.ingredientNames
    return <div>
             <h3>Таны захиалга</h3>
             <p>Таны сонгосон орцууд:</p>
             <ul>
               {Object.keys(list).map(el => (
               <li key={el}>
                   {props.ingredientNames[el]}: {props.ingredients[el]}
               </li>
               ))}
             </ul>
               <p>Захиалгын дүн: <strong>{props.price}₮</strong></p>
             <p>Цаашаа үргэлжлүүлэх үү?</p>
             <Button key={props.onCancel} text="Татгалзах" ButtonType="Danger" daragdsan={props.onCancel}/>
             <Button key={props.onContinue} text='Үргэлжлүүлэх' ButtonType="Success" daragdsan={props.onContinue}/>
           </div>
}

const mapStateToProps = state => {
  return{
    ingredients: state.burgerReducer.ingredients,
    ingredientNames: state.burgerReducer.ingredientNames,
    price: state.burgerReducer.totalPrice
  }
}
export default connect(mapStateToProps)(OrderSummary);