import React, { Component } from 'react';
import './Card.css'

class Card extends Component {
  truncate(string) {
    let description = '';

    if(string !== undefined){
      description = string.substr(0, 128);
      let last = description[127];

      if(last !== undefined && last !== ' '){
        description = description.substr(0, description.lastIndexOf(' ')) + '...';
      }
    }

    return description;
  }

  render() {
    const card_classes = `card ${this.props.description !== undefined ? 'has_description' : ''}`;
    const description = this.truncate(this.props.description);

    return (
      <div className={ card_classes }>
        <div className="title">
          { this.props.title }
        </div>

        <div className="description">
          { description }
        </div>
      </div>
    );
  }
}

export default Card;
