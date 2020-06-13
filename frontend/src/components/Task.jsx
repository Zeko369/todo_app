import React from 'react';
import './Task.scss';

export default function Task(props) {
  const { check, task } = props;
  const { id, completed, text } = task;

  return (
    <div className="task">
      <div className="checkbox1">
        <i className="material-icons md-dark " onClick={() => check(id)}>
          {completed ? 'check_box' : 'check_box_outline_blank'}
        </i>
      </div>
      <div className="text1">{text}</div>
    </div>
  );
}
