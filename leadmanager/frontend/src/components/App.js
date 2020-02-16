import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect  } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Link from 'react-router-dom';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from "./common/PrivateRoute";
import Alerts from './layout/Alerts';
import { Provider } from 'react-redux';
import store from "../store";
import {loadUser} from "../actions/auth"

    //Alert options
const alertOptions = {
    timeout: 3000,
    position: "top center"
}
class App extends Component {

componentDidMount(){
    store.dispatch(loadUser());
}

    render(){
       return (
       <Provider store={store}>
         <AlertProvider template={AlertTemplate}
             {...alertOptions}>
            <Fragment>
                <Router>
                    <Header />
                      <Alerts />
                    <div className="container">
                      <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                      </Switch>
                    </div>
                </Router>
            </Fragment>
          </AlertProvider>
        </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));