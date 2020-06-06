import React, { Component, Fragment } from 'react';
import axios from 'axios';
import config from '../config';
// import Card from '../components/Card'
import TodoCard from '../components/TodoCard';
import CreateTodoButton from '../components/CreateTodoButton';
import BottomNav from '../components/BottomNav';
import { Link } from 'react-router-dom';

var api_url = config[process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      showAll: true,
      loading: true,
    };

    this.delete = this.delete.bind(this);
    this.check = this.check.bind(this);
    this.changeShow = this.changeShow.bind(this);
    this.update = this.update.bind(this);
  }

  delete(id) {
    if (window.confirm('Are you sure')) {
      axios.delete(`${api_url}/todos/${id}`).then((res) => {
        if (res.status === 204) {
          const newArray = this.state.todos.filter((todo) => todo.id !== id);
          this.setState({ todos: newArray });
        }
      });
    }
  }

  check(id, index) {
    this.setState(({ todos }) => ({
      todos: todos.map((todo, i) => (i === index ? { ...todo, checked: !todo.checked } : todo)),
    }));

    axios.patch(`${api_url}/todos/${id}/check`).then((res) => {
      if (this.state.todos[index] !== res.data.checked) {
        this.setState({
          todos: this.state.todos.map((todo, i) => (i === index ? res.data : todo)),
        });
      }
    });
  }

  componentDidMount() {
    axios
      .get(`${api_url}/todos`)
      .then((res) => {
        const todos = res.data;
        this.setState({ todos: todos, loading: false });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  changeShow() {
    this.setState((state) => ({ showAll: !state.showAll }));
  }

  update(id, data) {
    this.setState((state) => ({
      todos: (state.todos || []).map((todo) => (todo.id === id ? data : todo)),
    }));
  }

  render() {
    const { loading, todos } = this.state;
    const count = {
      done: todos.filter((todo) => todo.checked).length,
      todo: todos.filter((todo) => !todo.checked).length,
    };

    return (
      <Fragment>
        <div className="container">
          {loading ? (
            <h3>Loading</h3>
          ) : (
            <>
              <div>
                <p style={{ float: 'right', margin: 0 }}>
                  {` todo: ${count.todo} (${count.done} done)`}
                </p>

                <label>
                  <input type="checkbox" checked={this.state.showAll} onChange={this.changeShow} />
                  Show all
                </label>

                <Link to="/new">New</Link>
              </div>

              {todos
                .filter((todo) => (this.state.showAll ? true : !todo.checked))
                .map((todo) => {
                  return (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      delete={this.delete}
                      check={this.check}
                      index={todos.indexOf(todo)}
                      update={this.update}
                    />
                  );
                })}

              <CreateTodoButton />
            </>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
