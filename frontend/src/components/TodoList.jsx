import React, { Component } from 'react'
import './TodoList.scss';

export default class TodoList extends Component {
  render() {
    return (
      <div className="card-container">
        { this.props.children }
      </div>
    )
  }
}
