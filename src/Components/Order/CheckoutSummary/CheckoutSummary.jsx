import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    console.log(props.ingredients);
    return ( 
        <div className={classes.CheckoutSummary}>
            <h2>We Hope It Testes Well!</h2>
            <div style={{width:"100%", textAlign:"center", margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
                clicked={props.burgercancelled} >CANCEL</Button>
            <Button btnType="Success"
                clicked={props.burgercontinued}>CONTINUE</Button>
        </div>
    );
}
 
export default checkoutSummary;