import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import config from '../config';
import TodoCard from '../components/TodoCard';
import CreateTodoButton from '../components/CreateTodoButton';
import New from '../components/New';

var api_url = config['production' || process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

interface Todo {
  id: number;
  title: string;
  description: null | string;
  checked: boolean;
  checkedAt: null | string;
  createdAt: string;
  updatedAt: string;
  tasks: any[];
}

interface Props {}
interface State {
  todos: Todo[];
  showAll: boolean;
  loading: boolean;
  order: 'DESC' | 'ASC';
  lin: boolean;
  error: null | string;
  showNew: boolean;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todos: [],
      showAll: localStorage.getItem('showAll') !== 'false',
      loading: true,
      order: (localStorage.getItem('order') as 'DESC' | 'ASC' | null) || 'DESC',
      lin: localStorage.getItem('lin') !== 'false',
      error: null,
      showNew: false,
    };

    this.check = this.check.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.refetch = this.refetch.bind(this);
    this.toggleNew = this.toggleNew.bind(this);
    this.toggleLin = this.toggleLin.bind(this);
    this.changeShow = this.changeShow.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  delete(id: number) {
    if (window.confirm('Are you sure')) {
      axios.delete(`${api_url}/todos/${id}`).then((res) => {
        if (res.status === 204) {
          const newArray = this.state.todos.filter((todo) => todo.id !== id);
          this.setState({ todos: newArray });
        }
      });
    }
  }

  check(id: number, index: number) {
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

  refetch() {
    return axios
      .get(`${api_url}/todos`)
      .then((res) => {
        const todos = res.data;
        this.setState({ todos: todos, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false, error: err });
        console.error(err);
      });
  }

  componentDidMount() {
    this.refetch();
  }

  changeShow() {
    const newValue = !this.state.showAll;
    localStorage.setItem('showAll', String(newValue));
    this.setState({ showAll: newValue });
  }

  update(id: number, data: Todo) {
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
    localStorage.setItem('lin', String(lin));
    this.setState({ lin });
  }

  toggleNew() {
    this.setState({ showNew: !this.state.showNew });
  }

  filterByLin(lin: boolean) {
    return (todo: Todo) => (lin ? todo.id >= 115 : true);
  }

  not(todo: Todo) {
    return !todo.checked && !todo.title.startsWith('#');
  }

  render() {
    const { loading, todos, order, lin, error, showNew } = this.state;
    const count = {
      done: todos.filter(this.filterByLin(lin)).filter((todo) => !this.not(todo)).length,
      todo: todos.filter(this.filterByLin(lin)).filter(this.not).length,
    };

    let filteredTodos = todos
      .filter((todo) => (this.state.showAll ? true : this.not(todo)))
      .filter(this.filterByLin(lin));

    if (order === 'ASC') {
      filteredTodos = filteredTodos.reverse();
    }

    return (
      <div className="container">
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h3>Error :(</h3>
        ) : (
          <>
            <div>
              <p style={{ float: 'right', margin: 0 }}>
                todo: {count.todo} ({count.done} done)
              </p>

              <label>
                <input type="checkbox" checked={this.state.showAll} onChange={this.changeShow} />
                Show all
              </label>

              <button onClick={this.toggleOrder}>{order}</button>
              <button onClick={this.toggleNew}>{showNew ? 'Hide' : 'Show'} new</button>
              <button onClick={this.toggleLin}>{lin ? 'Lin' : 'Not lin'}</button>

              <Link to="/new">New</Link>
            </div>

            {showNew && <New refetch={this.refetch} />}

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
    );
  }
}

export default Home;
