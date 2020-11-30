import React from "react"
import BurgerIngredient from "../BurgerIngredient"
import {withRouter} from "react-router-dom"
import css from "./style.module.css"
import {connect} from "react-redux"
const Burger = props => {  
    let content = []

    const items = Object.entries(props.orts)
    items.map((el) =>{
      for(let i =0; i<el[1]; i++){
        content.push(<BurgerIngredient key={`${el}${i+1}`} type={el[0]}/>)
      }
    })
    if(content.length === 0) content = <p className={css.Paragraph}>хачиртай талхныхаа орцыг сонгоно уу...</p>
    // console.log(props);
    return(<div className={css.Burger}>
        <BurgerIngredient type="bread-top"/>
        {content}
        <BurgerIngredient type="bread-bottom"/>
    </div>)
}

const mapStateToProps = state => {
  return {
     orts: state.burgerReducer.ingredients
  }
};
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Burger));