import React, { Component } from 'react';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        signUp: true,
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp)
    };

    swichAuthHandler = () => {
        this.setState (prevState =>  { 
            return {signUp : !prevState.signUp};
        } )
    }

    componentDidMount () {
        if ( ! this.props.buildingBurger && this.props.authRedirectPath != '/' ) {
            this.props.onAuthRedirectPath();
        }
    }

    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                shouldValidation={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(e) => this.inputChangedHandler(e, formElement.id)} />
        ) );

        if( this.props.loading ) {
            form = <Spinner />;
        };
        
        let errorMessage = null;
        if( this.props.error ) {
            errorMessage = <p> {this.props.error.message} </p>;
        };

        let authRedirect = null;
        if( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return ( 
            <div className={classes.Auth}>
                { authRedirect }
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Signing</Button>
                </form>

                <Button clicked={this.swichAuthHandler} btnType="Success">Switch To {this.state.signUp ?  'Sign In' : 'Sign Up'} </Button>
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        loading : state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
};

const mapDispatchToPrps = dispatch => {
    return {
        onAuth: ( email, password, signUp ) => dispatch(actions.auth(email, password, signUp)),
        onAuthRedirectPath: () => dispatch(actions.authRedirectPath('/')),
    }
};
 
export default connect ( mapStateToprops, mapDispatchToPrps ) ( Auth );