import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useHistory } from 'react-router-dom';
import './FormTodo.scss';

var api_url = config['production' || process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

const NewTodo: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      title: title,
      description: description.length > 0 ? description : null,
    };

    setLoading(true);

    axios.post(`${api_url}/todos`, data).then((res) => {
      setLoading(false);

      if (res.data['error'] === true) {
        setError(true);
      } else {
        history.push('/');
      }
    });
  };

  return (
    <Fragment>
      <div className="container form-container">
        {error && <h2>ERROR</h2>}
        <form onSubmit={onSubmit}>
          <div className="form-container123">
            <label>
              Title
              <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>

          <div className="form-container123">
            <label>
              Description
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div className="form-container123">
            <input className="btn" type="submit" value="Save" />
          </div>
        </form>
        {loading && <h1>Loading...</h1>}
      </div>
    </Fragment>
  );
};

export default NewTodo;
