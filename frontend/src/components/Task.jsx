import React from 'react';
import './Task.scss';

export default function Task(props) {
  return (
    <div className="task">
      <div className={`checkbox ${props.task.completed ? 'checked' : ''}`}></div>
      <div className="text">
        { props.task.title }
      </div>
    </div>
  )
}
