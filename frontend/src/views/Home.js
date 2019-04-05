import React, { Component, Fragment } from 'react';
// import './Home.css'
import axios from 'axios';

import Card from '../components/Card'
import CreateTodoButton from '../components/CreateTodoButton'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get(`http://zekan.tk:9999/todos`)
      .then(res => {
        const todos = res.data;
        this.setState({ todos: todos});
      });
  }

  render() {
    let todos = this.state.todos.map(item => {
      return <Card key={item.id} title={item.title} description={item.description}/>
    })

    return (
      <Fragment>
        <div className="container">
          {/* <div className="card-container"> */}
            { todos }
          {/* </div> */}

          <CreateTodoButton/>
        </div>
      </Fragment>
    );
  }
}

export default Home;
