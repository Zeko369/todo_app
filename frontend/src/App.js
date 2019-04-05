import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav'
import BottomNav from './components/BottomNav'

import Home from './views/Home'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Home/>
        <BottomNav/>
      </div>
    );
  }
}

export default App;
