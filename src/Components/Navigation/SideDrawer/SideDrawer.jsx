import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClass = [classes.SideDrawer, classes.Open]
    }
    return ( 
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(" ")} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />                    
                </div>
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>        
    );
}
 
export default sideDrawer;