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
      title: '',
      description: '',
      error: false,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let obj = {}
    obj[event.target.id] = event.target.value;
    this.setState(obj)
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      title: this.state.title,
      description: this.state.description.length > 0 ? this.state.description : null
    };

    axios.post(`${api_url}/todos`, data)
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
                <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
              </label>
            </div>

            <div className="form-container123">
              <label>
                Description
                <input type="text" id="description" value={this.state.description} onChange={this.handleChange}/>
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
      </Fragment>
    );
  }
}

export default NewTodo;
