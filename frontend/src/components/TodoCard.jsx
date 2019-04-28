import React, { Fragment, Component } from 'react'
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import Task from './Task';

import './TodoCard.scss';

export default class TodoCard extends Component {
  truncate(string, length) {
    let tmp_string = '';

    if(string !== null && string !== undefined){
      tmp_string = string.substr(0, length);
      let last = tmp_string[length-1];

      if(last !== undefined && last !== ' '){
        tmp_string = tmp_string.substr(0, tmp_string.lastIndexOf(' ')) + '...';
      }
    }

    return tmp_string;
  }

  tasks() {
    if(this.props.todo.tasks){
      return this.props.todo.tasks.map((item) => {
        return <Task task={item}/>
      });
    }
  }

  render() {
    const description = this.truncate(this.props.todo.description, 128);
    const body = this.props.todo.description || this.props.todo.tasks ? '' : 'no-body';

    const taskList = this.tasks();

    return (
      <Fragment>
        <div className={`card ${body}`}>
          <div className="checkbox">
            <MaterialIcon icon={this.props.todo.checked ? "check_box" : "check_box_outline_blank"} onClick={() => this.props.check(this.props.todo.id, this.props.index)}/>
          </div>

          <div className="controls">
            <Link to={`${this.props.todo.id}/edit`}>
              <MaterialIcon icon="edit" color='#28a745' />
            </Link>
            <MaterialIcon icon="delete" color='#dc3545' onClick={() => this.props.delete(this.props.todo.id)}/>
          </div>

          <div className="title">
            { this.props.todo.title }
          </div>

          <div className="body">
            { description }
            { taskList }
          </div>
        </div>
      </Fragment>
    )
  }
}
