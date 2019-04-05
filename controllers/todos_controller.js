const Todo = require('../models').Todo;

module.exports = {
  list(req, res) {
    return Todo
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(200).send({
            error: true,
            error_type: 'Not found'
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body);
    return Todo
      .create({
        title: req.body.title,
        description: req.body.description,
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
            description: req.body.description || todo.description,
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};