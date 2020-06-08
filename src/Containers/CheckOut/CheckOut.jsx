import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component {
    state = { 
        ingredients : null,
        price: 0,
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            console.log(param[0])

            if(param[0] === 'price' ) {
                price = param[1];
            }else {
                ingredients[param[0]] = +param[1];
            }
            // ingredients[param[0]] = +param[1];
        };
        // console.log(ingredients);
        this.setState({ingredients, totalPrice: price});
    };

    burgercancelledHandler = () => {
        this.props.history.goBack();
    };

    burgercontinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                    burgercancelled={this.burgercancelledHandler}
                    burgercontinued={this.burgercontinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}  />
            </div>
        );
    }
}
 
export default CheckOut;