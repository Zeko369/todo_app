import React, { Fragment, Component } from 'react';
import MaterialIcon from 'material-icons-react';
import axios from 'axios';
import config from '../config';
import Task from './Task';
import truncate from '../helpers/truncate';
import './TodoCard.scss';

var api_url = config[process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

export default class TodoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      title: '',
      description: '',
    };

    this.edit = this.edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { title, description } = this.props.todo;
    this.setState({ title, description });
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, description } = this.state;

    axios
      .patch(`${api_url}/todos${this.props.todo.id}`, {
        title,
        description: (description === null ? true : description.length === 0) ? null : description,
      })
      .then((res) => {
        if (res.data['error'] === true) {
          this.setState({ editing: false });
        } else {
          this.setState({ editing: false });
          this.props.update(this.props.todo.id, res.data);
        }
      });
  }

  onChange = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  edit() {
    this.setState({ editing: true });
  }

  render() {
    const { todo, check, index, delete: remove } = this.props;
    const { id, title, description, tasks = [], checked } = todo;
    const { editing } = this.state;

    return (
      <Fragment>
        <div
          className={`card ${description || tasks.length ? '' : 'no-body'} ${
            checked ? 'checked' : ''
          }`}
        >
          {editing ? (
            <form onSubmit={this.onSubmit} className="editContainer">
              <input type="text" value={this.state.title} onChange={this.onChange('title')} />
              <input
                type="text"
                value={this.state.description}
                onChange={this.onChange('description')}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <div>
                  <button className="green" type="submit">
                    Save
                  </button>
                  <button
                    className="red"
                    type="button"
                    onClick={() => this.setState({ editing: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="checkbox">
                <i className="material-icons md-24 md-dark " onClick={() => check(id, index)}>
                  {checked ? 'check_box' : 'check_box_outline_blank'}
                </i>
              </div>

              <div className="controls">
                <MaterialIcon icon="edit" color="#28a745" onClick={this.edit} />
                <MaterialIcon icon="delete" color="#dc3545" onClick={() => remove(id)} />
              </div>

              <div className="title">{title}</div>

              <div className="body">
                {truncate(description, 128)}
                {(tasks || []).map((task) => (
                  <Task task={task} check={() => {}} />
                ))}
              </div>
            </>
          )}
        </div>
      </Fragment>
    );
  }
}
