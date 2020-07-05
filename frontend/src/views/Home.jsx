import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import config from '../config';
// import Card from '../components/Card'
import TodoCard from '../components/TodoCard';
import CreateTodoButton from '../components/CreateTodoButton';
import BottomNav from '../components/BottomNav';

var api_url = config['production' || process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      showAll: localStorage.getItem('showAll') !== 'false',
      loading: true,
      order: localStorage.getItem('order') || 'DESC',
      lin: localStorage.getItem('lin') !== 'false',
    };

    this.check = this.check.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.toggleLin = this.toggleLin.bind(this);
    this.changeShow = this.changeShow.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
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
    const newValue = !this.state.showAll;
    localStorage.setItem('showAll', newValue);
    this.setState({ showAll: newValue });
  }

  update(id, data) {
    this.setState((state) => ({
      todos: (state.todos || []).map((todo) => (todo.id === id ? data : todo)),
    }));
  }

  toggleOrder() {
    const newOrder = this.state.order === 'DESC' ? 'ASC' : 'DESC';
    localStorage.setItem('order', newOrder);
    this.setState({ order: newOrder });
  }

  toggleLin() {
    const lin = !this.state.lin;
    localStorage.setItem('lin', lin);
    this.setState({ lin });
  }

  render() {
    const { loading, todos, order, lin } = this.state;
    const count = {
      done: todos
        .filter((todo) => (lin ? todo.id >= 115 : true))
        .filter((todo) => todo.checked || todo.title.startsWith('#')).length,
      todo: todos
        .filter((todo) => (lin ? todo.id >= 115 : true))
        .filter((todo) => !todo.checked && !todo.title.startsWith('#')).length,
    };

    let filteredTodos = todos.filter((todo) =>
      this.state.showAll ? true : !todo.checked && !todo.title.startsWith('#')
    );

    if (lin) {
      filteredTodos = filteredTodos.filter((todo) => todo.id >= 115);
    }

    if (order === 'ASC') {
      filteredTodos = filteredTodos.reverse();
    }

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

                <button onClick={this.toggleOrder}>{order}</button>
                <button onClick={this.toggleLin}>{lin ? 'Lin' : 'Not lin'}</button>

                <Link to="/new">New</Link>
              </div>

              {filteredTodos.map((todo) => {
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
