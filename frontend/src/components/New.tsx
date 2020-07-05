import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

var api_url = config['production' || process.env.NODE_ENV || 'development'].api_url;
const url = document.location.href;
if (url.indexOf(':') !== -1 && url.split('//')[1].split(':')[0].split('.').length === 4) {
  api_url = `${url.split(':').splice(0, 2).join(':')}:5000/api`;
}

const New: React.FC<{ refetch: () => Promise<any> }> = ({ refetch }) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description && description.length > 0 ? description : null,
    };

    setLoading(true);

    axios.post(`${api_url}/todos`, data).then((res) => {
      if (res.data['error'] === true) {
        setLoading(false);
        setError(true);
      } else {
        setTitle('');
        setDescription('');
        refetch().then(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <div style={{ marginBottom: 50 }}>
      {error && <h3>Error...</h3>}
      <form onSubmit={handleSubmit}>
        <div className="form-container123">
          <label>
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div className="form-container123">
          <label>
            Description
            <input
              type="text"
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
      {loading && <h3>Loading...</h3>}
    </div>
  );
};

export default New;
