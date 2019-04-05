import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="title">
          <Link to="/">
            Title
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
