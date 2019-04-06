import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Card.css'

class Card extends Component {
  truncate(string) {
    let description = '';

    if(string !== null){
      description = string.substr(0, 128);
      let last = description[127];

      if(last !== undefined && last !== ' '){
        description = description.substr(0, description.lastIndexOf(' ')) + '...';
      }
    }

    return description;
  }

  render() {
    const card_classes = `card ${this.props.todo.description !== null ? 'has_description' : ''}`;
    const description = this.truncate(this.props.todo.description);

    return (
      <div className={ card_classes }>
        <input type="checkbox" className="checkbox" checked={this.props.todo.checked}
         onChange={() => this.props.check(this.props.todo.id, this.props.index)}
        />

        <div className="title">
          { this.props.todo.title }
        </div>

        <div className="description">
          { description }
        </div>

        <div className="controls">
          <div className="a123button danger" onClick={() => this.props.delete(this.props.todo.id)}>
            Delete
          </div>
          <div className="a123button success">
            <Link to={`${this.props.todo.id}/edit`}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
