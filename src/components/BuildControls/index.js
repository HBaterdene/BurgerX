import react from 'react'
import {connect} from "react-redux"

import BuildControl from "../BuildControl"
import css from "./style.module.css"
import * as actions from "../../redux/actions/BurgerActions"
const BuildControls = props =>{
  const disabledIngredients = {...props.ingredients};
        for (let key in disabledIngredients) {
            disabledIngredients[key] =  disabledIngredients[key] <= 0;
        }
 return (
  <div className={css.BuildControls}>
        <p>Бургерийн үнэ: <strong>{props.price}</strong></p>
     
       {Object.keys(props.ingredientNames).map(el => (
         
           <BuildControl
           key={el}
           disabledIngredients = {disabledIngredients}
           ortsNemeh={props.ortsNemeh} 
           ortsHasah={props.ortsHasah} 
           type={el} orts={props.ingredientNames[el]}/>
       ))}
       <button className={css.OrderButton} disabled={!props.purchasing} onClick={props.showConfirmModal}>Захиалах</button>
  </div>)
}
const mapStateToProps = state => {
  return {
      price: state.burgerReducer.totalPrice,
     purchasing: state.burgerReducer.purchasing,
     ingredientNames: state.burgerReducer.ingredientNames,
     ingredients: state.burgerReducer.ingredients
 }
 }
 const mapDispatchToProps = dispatch => {
     return {
         ortsNemeh: ortsNer => dispatch(actions.addIngredient(ortsNer)),
         ortsHasah: ortsNer => dispatch(actions.removeIngredient(ortsNer))
     }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(BuildControls)
