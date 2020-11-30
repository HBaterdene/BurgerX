import React from 'react'
import Logo from '../Logo'
import css from './style.module.css'
import Menu from "../Menu"
import Shadow from "../../components/General/Shadow"
const SideBar = props => {
    let classes = [css.SideBar, css.Close]
    if(props.showSideBar){
        classes = [css.SideBar, css.Open]
    }
    return (
    <div >
       <Shadow show={props.showSideBar} onClick={props.toggleSideBar}/>
      <div className={classes.join(" ")} 
           onClick={props.toggleSideBar}>
       <div className={css.Logo}>
           <Logo/>
       </div>
       <Menu /> 
    </div>
    </div>
    );
}

export default SideBar;