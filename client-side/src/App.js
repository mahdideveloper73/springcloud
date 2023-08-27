import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/exchange/Home";
import ExchangeList from "./components/exchange/ExchangeList";
import ExchangeEdit from "./components/exchange/ExchangeEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/exchanges' exact={true} component={ExchangeList}/>
                    <Route path='/exchanges/:id' component={ExchangeEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;