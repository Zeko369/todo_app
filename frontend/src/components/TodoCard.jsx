import React, { Fragment, Component } from 'react'
import './TodoCard.scss';

import Task from './Task';

export default class TodoCard extends Component {
  state = {open: false}

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
    const description = this.state.open ? this.props.todo.description : this.truncate(this.props.todo.description, 128);
    const body = this.props.todo.description || this.props.todo.tasks ? '' : 'no-body';

    const taskList = this.tasks();

    return (
      <Fragment>
        <div className={`card ${body}`} onClick={() => this.setState({open: !this.state.open})}>
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
