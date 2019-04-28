import React, { Component } from 'react';
import './ModalTest.scss';
import TodoCard from '../components/TodoCard';
import TodoList from '../components/TodoList';

import '../views/ModalTest.scss';

export default class TestScren extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: true,
      todos: [
        {
          id: 1,
          title: 'Foobar',
          checked: true
        },
        {
          id: 2,
          title: 'Foobar',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor magna. Ipsum dolor sit amet consectetur adipiscing elit ut. Cursus metus aliquam eleifend mi in. Tellus integer feugiat scelerisque varius morbi enim nunc. Dolor sit amet consectetur adipiscing elit ut aliquam. Suspendisse potenti nullam ac tortor vitae purus. Tristique risus nec feugiat in fermentum posuere urna nec. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Nisi quis eleifend quam adipiscing vitae. Interdum varius sit amet mattis vulputate enim nulla aliquet. Nullam ac tortor vitae purus faucibus.',
          checked: false
        },
        // {
        //   id: 3,
        //   title: 'Foobar',
        //   tasks: [
        //     {
        //       id: 4,
        //       title: 'Task123',
        //       completed: false,
        //     },
        //     {
        //       id: 5,
        //       title: 'Something',
        //       completed: true
        //     }
        //   ]
        // },
        {
          id: 6,
          title: 'Foobar',
          checked: true
        },
      ]
    }
  }

  render() {
    const todos = this.state.todos.map((item, i) => <TodoCard todo={item} key={item.id} />);

    return (
      <React.Fragment>
        <TodoList>
          { todos }
        </TodoList>
      </React.Fragment>
    );
  }
}
