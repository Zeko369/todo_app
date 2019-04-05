import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import './NewTodo.css'

class NewTodo extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      error: false,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    console.log(event.target.value);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.title);
    event.preventDefault();

    const data = {
      title: this.state.title
    };

    axios.post(`http://localhost:5000/todos`, data)
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

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        <div className="form-container">
          { this.state.error ? 'ERROR' : '' }
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
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
