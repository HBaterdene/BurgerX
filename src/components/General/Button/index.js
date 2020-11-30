import React from 'react';
import css from './style.module.css'

const Button = props => <button className={`${css.Button} ${css[props.ButtonType]}`}  onClick={props.daragdsan}>{props.text}</button>

export default Button;