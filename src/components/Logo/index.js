import React from 'react';
import css from "./style.module.css"
import LogoImage from "../../assets/images/burger-logo.png"
const Logo = () =>( 
    <div className={css.Logo}>
        <img src={LogoImage}/>
    </div>
);

export default Logo;
