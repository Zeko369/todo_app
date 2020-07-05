import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import './App.scss';

import Nav from './components/Nav';
import Home from './views/Home';
import NewTodo from './views/NewTodo';
import EditTodo from './views/EditTodo';
import ModalTest from './views/ModalTest';
import TestScreen from './views/TestScreen';

var hist = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={hist}>
      <Nav />
      <Switch>
        <Route path="/new" component={NewTodo} />
        <Route path="/:id/edit" component={EditTodo} />
        <Route path="/modal" component={ModalTest} />
        <Route path="/test" component={TestScreen} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
