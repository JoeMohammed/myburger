import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : .3,
    cheese : .5,
    bacon : .8,
    meat : 1.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            cheese: 0,
            bacon: 0,
            meat : 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKeys => {
                return ingredients[igKeys]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0})
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState ({
            totalPrice: newPrice, ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    };
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount<= 0 ){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState ({
            totalPrice: newPrice, ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    };

    purchaseHandler = () => {
        this.setState ({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState ({purchasing: false});
    };
    purchaseContinueHandler = () => {
        alert ('You are Continued')
    }

    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        return ( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientDeduction={this.removeIngredientHandler} 
                    disabled={disabledInfo}  
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Auxiliary>
        );
    }
}
 
export default BurgerBuilder;