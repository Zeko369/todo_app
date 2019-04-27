import React, { Component, Fragment } from 'react';
import axios from 'axios'
import config from '../config'
import { Redirect } from 'react-router-dom'
import './FormTodo.scss'

import BottomNav from '../components/BottomNav';

var api_url = config[process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if(url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4){
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}
class NewTodo extends Component {
  constructor(props){
    super(props);

    this.state = {
      todo: {
        title: '',
        description: ''
      },
      error: false,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let obj = {todo: this.state.todo}
    obj['todo'][event.target.id] = event.target.value;
    this.setState(obj)
  }

  handleSubmit(event) {
    event.preventDefault();

    let description = '';
    if(this.state.todo.description !== null){
      description = this.state.todo.description.length > 0 ? this.state.todo.description : null
    }

    const data = {
      title: this.state.todo.title,
      description: description
    };

    axios.patch(`${api_url}/todo/${this.props.match.params.id}`, data)
      .then(res => {
        if(res.data['error'] === true){
          this.setState({error: true});
        } else {
          this.setState({redirect: true})
        }
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  componentDidMount() {
    axios.get(`${api_url}/todo/${this.props.match.params.id}`)
      .then(res => {
        if(res.data['error'] === true){
          alert('Not found');
          this.props.history.push(`/`);
        } else {
          const todo = res.data;
          this.setState({ todo: todo});
        }
      })
  }

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        <div className="container form-container">
          { this.state.error ? 'ERROR' : '' }
          <form onSubmit={this.handleSubmit}>
            <div className="form-container123">
              <label>
                Title
                <input type="text" id="title" value={this.state.todo.title} onChange={this.handleChange}/>
              </label>
            </div>

            <div className="form-container123">
              <label>
                Description
                <input type="text" id="description" value={this.state.todo.description || ''} onChange={this.handleChange}/>
              </label>
            </div>

            <div className="form-container123">
              <input className="btn" type="submit" value="Save" />
            </div>

            {/* <textarea></textarea> */}
            {/* <input type="date"/>
            <input type="time"/> */}
          </form>
        </div>
        <BottomNav path={this.props.location}/>
      </Fragment>
    );
  }
}

export default NewTodo;
