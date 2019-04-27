import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './App.scss';

import Nav from './components/Nav'

import Home from './views/Home'
import NewTodo from './views/NewTodo'
import EditTodo from './views/EditTodo'
import ModalTest from './views/ModalTest'

var hist = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Nav/>
        <Switch>
          <Route path="/new" component={NewTodo} />
          <Route path="/:id/edit" component={EditTodo} />
          <Route path="/modal" component={ModalTest} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
