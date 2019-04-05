import React, { Component, Fragment } from 'react';
import axios from 'axios'
import config from '../config'
import { Redirect } from 'react-router-dom'
import './NewTodo.css'

const api_url = config[process.env.NODE_ENV || 'development'].api_url;

class NewTodo extends Component {
  constructor(props){
    super(props);

    this.state = {
      todo:
        {
            title: '',
            description: '',
        },
      error: false,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let obj = {}
    this.state.todo[event.target.id] = event.target.value;
    this.setState(obj)
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      title: this.state.todo.title,
      description: this.state.todo.description.length > 0 ? this.state.todo.description : null
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
      return <Redirect to='/target' />
    }
  }

  componentDidMount() {
    axios.get(`${api_url}/todo/${this.props.match.params.id}`)
      .then(res => {
        const todo = res.data;
        this.setState({ todo: todo});
      });
  }

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        <div className="container form-container">
          { this.state.error ? 'ERROR' : '' }
          <form onSubmit={this.handleSubmit}>
            Title<br/>
            <input type="text" id="title" value={this.state.todo.title} onChange={this.handleChange}/>
            <br/>
            Description<br/>
            <input type="text" id="description" value={this.state.todo.description} onChange={this.handleChange}/>
            <input className="btn" type="submit" value="Save" />

            {/* <textarea></textarea> */}
            {/* <input type="date"/>
            <input type="time"/> */}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default NewTodo;
