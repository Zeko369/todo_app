import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './CreateTodoButton.scss'

class CreateTodoButton extends Component {
  render() {
    return (
      <Link to="/new">
        <div className="create-contiainer">
          <div className="button">
            <div className="icon">
              +
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default CreateTodoButton;
