import react from 'react';
import css from './style.module.css'
import {NavLink} from "react-router-dom"
const MenuItem = props => (
<li className={css.MenuItem}>
    {/* <a className={props.active ? css.active : null} href={props.link}>{props.children}</a> */}
    <NavLink exact={props.exact} activeClassName={css.active} to={props.link}>{props.children}</NavLink>
</li>
)
export default MenuItem;