import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.scss'

class BottomNav extends Component {
  render() {
    return (
      <div className="bottom-nav">
        <div className="item">
          <Link to="/modal">
            Modal
          </Link>
          <div className={`line ${this.props.path.pathname === '/modal' ? 'selected' : ''}`}/>
        </div>
        <div className="item">
          <Link to="/new">
            Today
          </Link>
          <div className={`line ${this.props.path.pathname === '/new' ? 'selected' : ''}`}/>
        </div>
        <div className="item">
          <Link to="/">
            Home
          </Link>
          <div className={`line ${this.props.path.pathname === '/' ? 'selected' : ''}`}/>
        </div>
      </div>
    );
  }
}

export default BottomNav;
