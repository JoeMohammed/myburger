import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type:"salad"},
    {label: "Meat", type:"meat"},
    {label: "Bacon", type:"bacon"},
    {label: "Cheese", type:"cheese"},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>price: <b>{props.price.toFixed(2)}$</b></p>
        {controls.map (crtl => (
            <BuildControl 
                key={crtl.label} 
                label={crtl.label} 
                added={() => props.ingredientAdded(crtl.type)} 
                deduction={() => props.ingredientDeduction(crtl.type)}
                disabled={props.disabled[crtl.type]}   
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}
        >Order Now</button>
    </div>
);

export default buildControls;