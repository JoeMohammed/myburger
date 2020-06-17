import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';    
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer};
        } );
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToprops = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToprops)(Layout) ;