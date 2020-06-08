import React, { Component } from 'react';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : .3,
    cheese : .5,
    bacon : .8,
    meat : 1.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
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

    componentDidMount () {
        axios.get('https://react-my-burger-5d1e3.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error : true});
            });
    }

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
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout/constact-data',
            search: '?' + queryString,
        });
    }

    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let newOrderSummary = null;
        let burger = this.state.error ? <p style={{textAlign:"center"}}>Can't be Arrived to Data</p> : <Spinner />;
        if(this.state.ingredients) {
            burger = (
                <Auxiliary>
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

            newOrderSummary =  <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
            
        }

        if(this.state.loading) {
            newOrderSummary = <Spinner />;
        }
        return ( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {newOrderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);