import React, { Component, Fragment } from 'react';
import axios from 'axios';
import config from '../config'
import Card from '../components/Card'
import CreateTodoButton from '../components/CreateTodoButton'

const api_url = config[process.env.NODE_ENV || 'development'].api_url;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      show_done: false
    };

    this.delete = this.delete.bind(this)
    this.check = this.check.bind(this)
    this.changeShow = this.changeShow.bind(this)
  }

  delete(id){
    axios.delete(`${api_url}/todo/${id}`)
      .then(res => {
        if(res.status === 204){
          const newArray = this.state.todos.filter((todo) => todo.id !== id);
          this.setState({todos: newArray})
        }
      });
  }

  check(id, index){
    axios.patch(`${api_url}/todo/${id}/check`)
      .then(res => {
        let todos = this.state.todos;
        todos[index].checked = !todos[index].checked;
        this.setState({todos});
      });
  }

  componentDidMount() {
    axios.get(`${api_url}/todos`)
      .then(res => {
        const todos = res.data;
        this.setState({ todos: todos});
      });
  }

  changeShow(){
    this.setState({show_done: !this.state.show_done});
  }

  render() {
    let todos = this.state.todos
      .filter((todo) => this.state.show_done ? true : !todo.checked)
      .map((todo, index) => {
        return <Card key={todo.id} todo={todo} delete={this.delete} check={this.check} index={index}/>
      });

    return (
      <Fragment>
        <div className="container">
          <div>
            <label>
              <input type="checkbox" checked={this.state.show_done} onChange={this.changeShow}/>
              Show completed
            </label>
          </div>

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
