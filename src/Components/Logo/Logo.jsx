import React from 'react'; 

import BurgerLogo from '../../assets/img/BurgerLogo.png'
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={BurgerLogo} alt="Burger Logo"></img>
    </div>
)
export default Logo;