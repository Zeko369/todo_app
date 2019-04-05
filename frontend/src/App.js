import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';

import Nav from './components/Nav'
import BottomNav from './components/BottomNav'

import Home from './views/Home'
import NewTodo from './views/NewTodo'

var hist = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Nav/>
        <Switch>
          <Route path="/new" component={NewTodo} />
          <Route path="/" component={Home} />
        </Switch>
        <BottomNav/>
      </Router>
    );
  }
}

export default App;
