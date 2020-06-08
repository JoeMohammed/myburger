import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/CheckOut';
import Orders from './Containers/CheckOut/Order/Orders';

class  App extends Component {
  /*
  state = {
    show: true,
  }

  componentDidMount () {
    setTimeout (() => {
      this.setState({show: false});
    }, 5000)
  }
  */

  render() {
    return (
      <div >
        <Layout>
          {/*{this.state.show ? <BurgerBuilder /> : null}*/}
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>\ 
        </Layout>
      </div>
    );
  }
}

export default App;
